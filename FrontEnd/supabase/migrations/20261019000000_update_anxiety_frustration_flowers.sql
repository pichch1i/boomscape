-- Keep legacy IDs for historical events while using the new flower identities for new results.
alter table public.touchdesigner_events
  drop constraint if exists touchdesigner_events_flower_id_check;

alter table public.touchdesigner_events
  add constraint touchdesigner_events_flower_id_check check (
    flower_id in (
      'sunflower', 'peach_rose', 'daisy', 'striped_carnation', 'globe_thistle',
      'lavender', 'dandelion'
    )
  );

create or replace function public.queue_touchdesigner_event()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  mapped_flower_id text;
  mapped_visual_index smallint;
  is_first_completion boolean;
begin
  if tg_op = 'INSERT' then
    is_first_completion := new.submitted_at is not null;
  else
    is_first_completion := new.submitted_at is not null and old.submitted_at is null;
  end if;

  if new.submitted_at is null or new.result_emotion is null then
    return new;
  end if;

  select flower_id, visual_index
    into mapped_flower_id, mapped_visual_index
  from (
    values
      ('Hope', 'sunflower', 0::smallint),
      ('Anxiety', 'peach_rose', 1::smallint),
      ('Serenity', 'daisy', 2::smallint),
      ('Sadness', 'striped_carnation', 3::smallint),
      ('Frustration', 'globe_thistle', 4::smallint)
  ) as flower_map(emotion, flower_id, visual_index)
  where emotion = new.result_emotion;

  if is_first_completion then
    insert into public.touchdesigner_events (
      event_type, submission_id, emotion, flower_id, flower, result_title,
      visual_index, flower_nickname, nickname_submitted_at, submitted_at
    ) values (
      'result', new.submission_id, new.result_emotion, mapped_flower_id,
      new.flower, new.result_title, mapped_visual_index, new.flower_nickname,
      new.nickname_submitted_at, new.submitted_at
    );
  elsif tg_op = 'UPDATE' and
    new.flower_nickname is distinct from old.flower_nickname and
    new.flower_nickname is not null then
    insert into public.touchdesigner_events (
      event_type, submission_id, emotion, flower_id, flower, result_title,
      visual_index, flower_nickname, nickname_submitted_at, submitted_at
    ) values (
      'nickname_updated', new.submission_id, new.result_emotion, mapped_flower_id,
      new.flower, new.result_title, mapped_visual_index, new.flower_nickname,
      new.nickname_submitted_at, new.submitted_at
    );
  end if;

  return new;
end;
$$;

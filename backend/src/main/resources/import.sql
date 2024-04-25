INSERT INTO public.user_info VALUES ('000001', 'Zxcid');
INSERT INTO public.user_info VALUES ('000002', 'Blink');

INSERT INTO public.campaigns ("id", "camp_name", "description", "update_date", "user_id") values (1, 'Campagna1', 'Prima campagna di test', current_timestamp, '000001');

insert into public."characters" (char_level, id, update_date, char_class, char_name, user_id) values (13, 1, current_timestamp, 'Mago', 'Blink', '000002');

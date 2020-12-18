CREATE TABLE Users(
	dis_id text PRIMARY KEY,
	dis_username text NOT NULL,
	dis_lv int CHECK (dis_lv >= 0 AND dis_lv <= 10) NOT NULL,
	dis_xp int CHECK (dis_xp >= 0 AND dis_xp < 500001) NOT NULL,
	dis_coins int CHECK (dis_coins >= 0 AND dis_coins < 501) NOT NULL,
	dis_birth DATE,
	dis_stars INTEGER CHECK (dis_stars >= 0),
	dis_colors TEXT CHECK (dis_colors IS NULL OR dis_colors ~* '^#[a-f0-9]{2}[a-f0-9]{2}[a-f0-9]{2}$')
);
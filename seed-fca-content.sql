-- FCA Initial Content Seed Data
-- Daily Devotionals for Athletes

-- Devotional 1: Today's devotional
INSERT INTO fca_devotionals (title, content, scripture, scripture_reference, author, publish_date, featured, category, prayer, views, likes, shares)
VALUES (
  'Finding Strength in the Storm',
  'As athletes, we face challenges that test our limits every day. Whether it''s a tough practice, a difficult opponent, or the pressure of competition, we need a source of strength that goes beyond our physical abilities. Today''s scripture reminds us that our true power comes from Christ.\n\nWhen you step onto the field, court, or track today, remember that you''re not alone. God is with you in every sprint, every play, every moment. Your faith is your foundation, and through Him, you can accomplish more than you ever imagined.\n\nThe apostle Paul wrote these words while imprisoned, yet he found strength not in his circumstances but in his relationship with Christ. As athletes, we can apply this same principle. Our performance doesn''t define us - our identity in Christ does.',
  'I can do all things through Christ who strengthens me.',
  'Philippians 4:13',
  'Chad A. Dozier',
  CURDATE(),
  'yes',
  'Strength',
  'Lord, thank You for being my strength when I am weak. Help me to rely on You in every competition, every practice, and every moment of my athletic journey. Give me the courage to face challenges knowing You are with me. Amen.',
  0, 0, 0
);

-- Devotional 2
INSERT INTO fca_devotionals (title, content, scripture, scripture_reference, author, publish_date, featured, category, prayer, views, likes, shares)
VALUES (
  'Running the Race with Purpose',
  'Every athlete knows the importance of running with purpose. You don''t just show up to practice without a goal. You don''t compete without a strategy. The same is true for our spiritual lives.\n\nThe writer of Hebrews uses athletic imagery to describe our faith journey. We are surrounded by a great cloud of witnesses - those who have gone before us and shown us what faithful living looks like. They cheer us on as we run our own race.\n\nBut notice what we must do: throw off everything that hinders. In athletics, we call this "cutting weight" or eliminating distractions. What''s holding you back from running your best race for God? Is it fear? Doubt? Sin? Today, identify what''s slowing you down and give it to God.',
  'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus.',
  'Hebrews 12:1-2',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 1 DAY),
  'no',
  'Perseverance',
  'Father, help me to run my race with purpose and perseverance. Show me what I need to let go of so I can run freely. Keep my eyes fixed on Jesus, the author and perfecter of my faith. Amen.',
  24, 8, 2
);

-- Devotional 3
INSERT INTO fca_devotionals (title, content, scripture, scripture_reference, author, publish_date, featured, category, prayer, views, likes, shares)
VALUES (
  'Victory Through Faith',
  'In sports, we measure victory by the scoreboard. But as Christian athletes, we understand that true victory goes far beyond wins and losses. Our faith gives us victory over fear, doubt, and even death itself.\n\nThe apostle John reminds us that everyone born of God overcomes the world. This isn''t about being undefeated in your sport - it''s about being victorious in life. When you trust in Jesus, you''ve already won the most important battle.\n\nThis perspective changes everything. You can compete with freedom because your identity isn''t tied to your performance. You can face losses with grace because your worth isn''t determined by a scoreboard. You can encourage teammates because you''re secure in who you are in Christ.',
  'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.',
  '1 John 5:4',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 2 DAY),
  'no',
  'Victory',
  'Lord, thank You for the victory I have in You. Help me to compete with freedom, knowing that my identity is secure in Christ. May my life reflect Your victory to everyone around me. Amen.',
  45, 15, 5
);

-- Devotional 4
INSERT INTO fca_devotionals (title, content, scripture, scripture_reference, author, publish_date, featured, category, prayer, views, likes, shares)
VALUES (
  'The Ultimate Teammate',
  'No athlete succeeds alone. Behind every great performance is a team of coaches, trainers, family members, and teammates who made it possible. As Christian athletes, we have the ultimate teammate in Jesus Christ.\n\nSolomon''s wisdom applies perfectly to athletics: two are better than one. When you fall, someone is there to help you up. When you''re tired, someone shares the load. When you face opposition, you don''t face it alone.\n\nBut here''s the beautiful truth: Jesus is always with you. He never gets tired of supporting you. He never gives up on you. He celebrates your victories and comforts you in defeat. He''s the teammate who will never let you down.',
  'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.',
  'Ecclesiastes 4:9-10',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 3 DAY),
  'no',
  'Teamwork',
  'Jesus, thank You for being my ultimate teammate. Help me to be a good teammate to others, lifting them up when they fall and celebrating their successes. May our team reflect Your love. Amen.',
  67, 22, 8
);

-- Devotional 5
INSERT INTO fca_devotionals (title, content, scripture, scripture_reference, author, publish_date, featured, category, prayer, views, likes, shares)
VALUES (
  'Courage on the Field',
  'Every athlete faces moments that require courage. The big game. The crucial at-bat. The final seconds. In those moments, fear can either paralyze us or motivate us. God''s word gives us the key to facing fear with courage.\n\nJoshua was about to lead Israel into battle against formidable enemies. God''s instruction was clear: be strong and courageous. Why? Not because Joshua was the strongest or most skilled warrior, but because God promised to be with him wherever he went.\n\nThe same promise applies to you. When you step into competition, God goes with you. When you face your fears, He''s right beside you. Your courage doesn''t come from your abilities - it comes from His presence.',
  'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  'Joshua 1:9',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 4 DAY),
  'no',
  'Courage',
  'Lord, give me courage to face every challenge. When fear rises up, remind me that You are with me. Help me to be strong and courageous, not in my own strength, but in Yours. Amen.',
  89, 31, 12
);

-- Daily Verses
INSERT INTO fca_daily_verses (verse, reference, translation, theme, reflection, display_date, views, shares)
VALUES 
(
  'I can do all things through Christ who strengthens me.',
  'Philippians 4:13',
  'NKJV',
  'Strength',
  'This verse reminds us that our strength comes from Christ, not from ourselves. In athletics and in life, we can face any challenge with His power.',
  CURDATE(),
  0, 0
),
(
  'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
  'Isaiah 40:31',
  'NIV',
  'Endurance',
  'When we feel exhausted, God promises to renew our strength. Trust in Him and He will give you the endurance to finish strong.',
  DATE_ADD(CURDATE(), INTERVAL 1 DAY),
  0, 0
),
(
  'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  'Joshua 1:9',
  'NIV',
  'Courage',
  'God commands us to be courageous because He promises to be with us. Face your fears knowing you''re never alone.',
  DATE_ADD(CURDATE(), INTERVAL 2 DAY),
  0, 0
);

-- Podcasts
INSERT INTO fca_podcasts (title, description, audio_url, thumbnail_url, duration, episode_number, season, host, guest, publish_date, featured, transcript, plays, likes, downloads)
VALUES 
(
  'The Foundation of Faith in Sports',
  'In this premiere episode of Faith & The Field, Chad A. Dozier shares his personal journey of faith and how it shaped his vision for ATHLYNX. Learn how to integrate your spiritual life with your athletic pursuits and discover why faith is the ultimate competitive advantage.',
  'https://storage.athlynx.ai/podcasts/episode-1.mp3',
  'https://storage.athlynx.ai/podcasts/episode-1-thumb.jpg',
  2700,
  1,
  1,
  'Chad A. Dozier',
  NULL,
  DATE_SUB(CURDATE(), INTERVAL 7 DAY),
  'yes',
  NULL,
  156, 45, 89
),
(
  'Overcoming Adversity: Stories from the Field',
  'This week we hear incredible stories from athletes who faced career-ending injuries, personal tragedies, and seemingly impossible odds - and how their faith carried them through. These testimonies will inspire you to keep fighting no matter what you face.',
  'https://storage.athlynx.ai/podcasts/episode-2.mp3',
  'https://storage.athlynx.ai/podcasts/episode-2-thumb.jpg',
  3120,
  2,
  1,
  'Chad A. Dozier',
  'Marcus Williams, Former NFL Player',
  DATE_SUB(CURDATE(), INTERVAL 14 DAY),
  'no',
  NULL,
  234, 67, 112
);

-- Blog Posts
INSERT INTO fca_blog_posts (title, slug, excerpt, content, author, publish_date, featured, category, tags, featured_image, views, likes, shares)
VALUES 
(
  'How Faith Transforms Athletic Performance',
  'how-faith-transforms-athletic-performance',
  'Discover how top athletes use their faith as a foundation for excellence and how you can apply these principles to your own athletic journey.',
  'Faith and athletics have been intertwined throughout history. From Eric Liddell refusing to run on Sunday at the 1924 Olympics to Tim Tebow kneeling in prayer after touchdowns, athletes have long used their faith as a source of strength and inspiration.\n\nBut how exactly does faith transform athletic performance? Let''s explore the science and spirituality behind this powerful connection.\n\n## Mental Clarity and Focus\n\nFaith provides athletes with a sense of purpose beyond winning. This perspective reduces performance anxiety and allows athletes to compete with freedom. When your identity isn''t tied to your performance, you can take risks and play with confidence.\n\n## Resilience in Adversity\n\nEvery athlete faces setbacks - injuries, losses, slumps. Faith provides a framework for understanding suffering and finding meaning in difficult times. Athletes with strong faith tend to recover faster from setbacks because they have hope beyond their circumstances.\n\n## Team Unity\n\nShared faith creates bonds that go deeper than shared goals. Teams that pray together, worship together, and support each other spiritually often display remarkable chemistry on the field.\n\n## Practical Application\n\n1. Start each day with prayer and scripture\n2. Find a faith community of fellow athletes\n3. Use competition as an opportunity to glorify God\n4. Remember that your worth isn''t determined by your performance',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 5 DAY),
  'yes',
  'Faith & Sports',
  'faith,performance,mental game,spirituality',
  'https://storage.athlynx.ai/blog/faith-performance.jpg',
  234, 56, 23
),
(
  'Building a Team on Faith',
  'building-a-team-on-faith',
  'The power of shared beliefs in creating championship culture and how faith-based teams consistently outperform expectations.',
  'Championship teams share something special - a bond that goes beyond talent and strategy. Many of the most successful teams in sports history have been built on a foundation of shared faith.\n\nFrom the "Miracle on Ice" 1980 US Hockey team to recent championship squads, faith has been a common thread among teams that achieve greatness against the odds.\n\n## Creating a Faith-Based Team Culture\n\nBuilding a team on faith doesn''t mean everyone has to share the same beliefs. It means creating an environment where:\n\n- Players are valued as people, not just performers\n- Character is developed alongside skills\n- Struggles are shared and supported\n- Success is celebrated with gratitude\n- Failure is met with grace\n\n## Practical Steps for Coaches\n\n1. Model the values you want to see\n2. Create space for spiritual growth (optional team chapel, etc.)\n3. Emphasize character in recruiting\n4. Address the whole person, not just the athlete\n5. Build genuine relationships with players',
  'Chad A. Dozier',
  DATE_SUB(CURDATE(), INTERVAL 10 DAY),
  'no',
  'Leadership',
  'teamwork,culture,coaching,leadership',
  'https://storage.athlynx.ai/blog/team-faith.jpg',
  189, 42, 18
);

-- Prayer Requests (sample approved ones for the prayer wall)
INSERT INTO fca_prayer_requests (user_id, user_name, is_anonymous, title, request, category, status, prayer_count, approved, created_at)
VALUES 
(
  1,
  'Anonymous',
  'yes',
  'Strength for Upcoming Season',
  'Praying for strength and wisdom as I prepare for the upcoming season. Please pray that I stay healthy and perform to the best of my abilities while glorifying God in everything I do.',
  'Competition',
  'active',
  24,
  'yes',
  DATE_SUB(NOW(), INTERVAL 3 DAY)
),
(
  2,
  'Marcus J.',
  'no',
  'Recovery from Injury',
  'Thank you all for your prayers! I''m back on the field and feeling stronger than ever. God is good! After tearing my ACL last year, I wasn''t sure if I''d ever play again. But through faith, hard work, and your prayers, I''m back.',
  'Health',
  'answered',
  156,
  'yes',
  DATE_SUB(NOW(), INTERVAL 14 DAY)
),
(
  3,
  'Sarah M.',
  'no',
  'College Decision Guidance',
  'I have offers from three schools and I''m struggling to know which one is God''s plan for me. Please pray for clarity and peace as I make this important decision.',
  'Guidance',
  'active',
  45,
  'yes',
  DATE_SUB(NOW(), INTERVAL 5 DAY)
);

-- Testimonies
INSERT INTO fca_testimonies (user_id, athlete_name, sport, school, title, testimony, scripture, featured, publish_date, views, likes, shares, approved)
VALUES 
(
  1,
  'Jordan Williams',
  'Football',
  'University of Alabama',
  'From Doubt to Championship',
  'When I tore my ACL during my junior year, I thought my career was over. The doctors said I might never play at the same level again. But through faith and the support of this community, I not only recovered but came back stronger than ever.\n\nDuring my recovery, I spent hours in prayer and scripture. Philippians 4:13 became my anthem. I realized that my identity wasn''t in football - it was in Christ. That freedom allowed me to rehab without fear and return to the field with joy.\n\nLast season, we won the championship. But the real victory happened in that hospital bed when I surrendered my career to God.',
  'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11',
  'yes',
  DATE_SUB(CURDATE(), INTERVAL 30 DAY),
  456, 123, 67,
  'yes'
),
(
  2,
  'Sarah Chen',
  'Basketball',
  'Stanford University',
  'Finding Peace in Pressure',
  'The pressure of D1 basketball was overwhelming. I was having panic attacks before games, struggling to sleep, and questioning if I even wanted to play anymore. Then a teammate invited me to FCA.\n\nI learned that I was putting my identity in my performance instead of in Christ. When I started playing for an audience of One, everything changed. I still feel nervous before big games, but now I have peace that passes understanding.\n\nMy faith is my competitive advantage. I play with freedom because I know my worth isn''t determined by my stats.',
  'Be still and know that I am God. - Psalm 46:10',
  'yes',
  DATE_SUB(CURDATE(), INTERVAL 45 DAY),
  389, 98, 45,
  'yes'
);

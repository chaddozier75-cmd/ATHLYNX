-- E-COMMERCE TABLES

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- 'baseball', 'fishing', 'golf', 'hunting', 'fitness', etc.
  subcategory VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  sku VARCHAR(100) UNIQUE,
  brand VARCHAR(100),
  condition ENUM('new', 'used_like_new', 'used_good', 'used_fair') DEFAULT 'new',
  stock_quantity INT DEFAULT 0,
  images JSON, -- Array of image URLs
  specifications JSON, -- Product specs as key-value pairs
  is_active BOOLEAN DEFAULT true,
  seller_id INT, -- NULL for platform-sold items
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shopping_carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSON NOT NULL,
  billing_address JSON NOT NULL,
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255),
  tracking_number VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  seller_id INT,
  commission_rate DECIMAL(5, 2) DEFAULT 15.00,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL
);

-- FISHING TABLES

CREATE TABLE IF NOT EXISTS fishing_spots (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  country VARCHAR(100) DEFAULT 'USA',
  state VARCHAR(50),
  city VARCHAR(100),
  water_type ENUM('freshwater', 'saltwater', 'brackish') NOT NULL,
  body_of_water VARCHAR(255), -- Lake name, river name, etc.
  species JSON, -- Array of fish species found here
  best_season VARCHAR(50),
  best_time_of_day VARCHAR(50),
  access_type ENUM('public', 'private', 'permit_required') DEFAULT 'public',
  amenities JSON, -- Boat ramp, parking, restrooms, etc.
  rating DECIMAL(3, 2) DEFAULT 0,
  total_catches INT DEFAULT 0,
  created_by INT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fishing_catches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  fishing_spot_id INT,
  species VARCHAR(100) NOT NULL,
  weight DECIMAL(6, 2), -- in pounds
  length DECIMAL(6, 2), -- in inches
  photo_url VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  caught_at TIMESTAMP NOT NULL,
  weather_conditions VARCHAR(255),
  water_temp DECIMAL(5, 2),
  bait_lure_used VARCHAR(255),
  notes TEXT,
  is_released BOOLEAN DEFAULT false,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (fishing_spot_id) REFERENCES fishing_spots(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS fishing_tournaments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  fishing_spot_id INT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  entry_fee DECIMAL(10, 2) DEFAULT 0,
  prize_pool DECIMAL(10, 2) DEFAULT 0,
  max_participants INT,
  rules TEXT,
  species_category VARCHAR(100), -- 'bass', 'trout', 'any', etc.
  scoring_method ENUM('total_weight', 'biggest_fish', 'most_catches') DEFAULT 'total_weight',
  status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (fishing_spot_id) REFERENCES fishing_spots(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fishing_tournament_participants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tournament_id INT NOT NULL,
  user_id INT NOT NULL,
  total_weight DECIMAL(8, 2) DEFAULT 0,
  total_catches INT DEFAULT 0,
  biggest_fish_weight DECIMAL(6, 2) DEFAULT 0,
  rank INT,
  prize_amount DECIMAL(10, 2),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES fishing_tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_tournament_user (tournament_id, user_id)
);

-- GOLF TABLES

CREATE TABLE IF NOT EXISTS golf_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'USA',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(50),
  website VARCHAR(500),
  holes INT DEFAULT 18,
  par INT,
  course_rating DECIMAL(4, 2),
  slope_rating INT,
  yardage INT,
  designer VARCHAR(255),
  year_built INT,
  course_type ENUM('public', 'private', 'semi_private') DEFAULT 'public',
  green_fees_range VARCHAR(100), -- e.g., "$50-$100"
  amenities JSON, -- Pro shop, restaurant, driving range, etc.
  photos JSON,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_rounds INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS golf_rounds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  golf_course_id INT NOT NULL,
  played_at TIMESTAMP NOT NULL,
  total_score INT NOT NULL,
  total_putts INT,
  fairways_hit INT,
  greens_in_regulation INT,
  scorecard JSON, -- Hole-by-hole scores
  notes TEXT,
  weather_conditions VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (golf_course_id) REFERENCES golf_courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS golf_handicaps (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  handicap_index DECIMAL(4, 2) NOT NULL,
  last_calculated_at TIMESTAMP NOT NULL,
  rounds_used INT DEFAULT 0,
  usga_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS golf_tournaments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  golf_course_id INT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  entry_fee DECIMAL(10, 2) DEFAULT 0,
  prize_pool DECIMAL(10, 2) DEFAULT 0,
  max_participants INT,
  format ENUM('stroke_play', 'match_play', 'scramble', 'best_ball') DEFAULT 'stroke_play',
  handicap_required BOOLEAN DEFAULT false,
  status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (golf_course_id) REFERENCES golf_courses(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- HUNTING TABLES

CREATE TABLE IF NOT EXISTS hunting_spots (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  state VARCHAR(50),
  county VARCHAR(100),
  land_type ENUM('public', 'private', 'lease') NOT NULL,
  acreage INT,
  game_species JSON, -- Array of game species
  terrain_type VARCHAR(100), -- Forest, field, marsh, etc.
  best_season VARCHAR(50),
  access_notes TEXT,
  amenities JSON, -- Blinds, stands, feeders, etc.
  rating DECIMAL(3, 2) DEFAULT 0,
  created_by INT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hunting_harvests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  hunting_spot_id INT,
  species VARCHAR(100) NOT NULL,
  weight DECIMAL(6, 2),
  points INT, -- For antlered game
  photo_url VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  harvested_at TIMESTAMP NOT NULL,
  weapon_type ENUM('rifle', 'shotgun', 'bow', 'crossbow', 'muzzleloader') NOT NULL,
  weather_conditions VARCHAR(255),
  notes TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hunting_spot_id) REFERENCES hunting_spots(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS hunting_licenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  state VARCHAR(50) NOT NULL,
  license_type VARCHAR(100) NOT NULL, -- General, deer, turkey, etc.
  license_number VARCHAR(100),
  issue_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  cost DECIMAL(10, 2),
  tags_remaining INT,
  document_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- UNIVERSAL EVENTS TABLE (All Sports)

CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  event_type ENUM('tournament', 'league', 'camp', 'clinic', 'meetup', 'competition') NOT NULL,
  sport_category VARCHAR(100) NOT NULL, -- 'baseball', 'fishing', 'golf', 'hunting', etc.
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  registration_deadline TIMESTAMP,
  location_name VARCHAR(255),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  entry_fee DECIMAL(10, 2) DEFAULT 0,
  prize_pool DECIMAL(10, 2) DEFAULT 0,
  max_participants INT,
  min_participants INT,
  age_restriction VARCHAR(50),
  skill_level ENUM('beginner', 'intermediate', 'advanced', 'all') DEFAULT 'all',
  rules TEXT,
  status ENUM('draft', 'published', 'registration_open', 'registration_closed', 'in_progress', 'completed', 'cancelled') DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  banner_image_url VARCHAR(500),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS event_participants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  team_name VARCHAR(255),
  registration_status ENUM('pending', 'confirmed', 'waitlist', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  payment_intent_id VARCHAR(255),
  score DECIMAL(10, 2),
  rank INT,
  prize_amount DECIMAL(10, 2),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_event_user (event_id, user_id)
);

-- SOCIAL FEATURES

CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT,
  media_urls JSON, -- Array of photo/video URLs
  post_type ENUM('text', 'photo', 'video', 'achievement', 'catch', 'harvest', 'round') DEFAULT 'text',
  sport_category VARCHAR(100),
  related_id INT, -- ID of related catch, harvest, round, etc.
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS post_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  parent_comment_id INT, -- For nested replies
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES post_comments(id) ON DELETE CASCADE
);

-- INDEXES FOR PERFORMANCE

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_fishing_spots_location ON fishing_spots(latitude, longitude);
CREATE INDEX idx_fishing_catches_user ON fishing_catches(user_id);
CREATE INDEX idx_golf_courses_location ON golf_courses(latitude, longitude);
CREATE INDEX idx_hunting_spots_location ON hunting_spots(latitude, longitude);
CREATE INDEX idx_events_sport_category ON events(sport_category);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

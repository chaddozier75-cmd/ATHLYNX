import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const products = [
  // Enterprise Hardware - Servers
  {
    name: "Supermicro 4U 60-Bay Storage Server",
    description: "High-capacity storage server with 60 hot-swap 3.5\" drive bays, Intel Xeon processors, and enterprise-grade reliability. Ideal for data centers and large-scale storage needs.",
    price: 38750.00,
    category: "enterprise-hardware",
    image_url: "/images/store/server-storage.jpg",
    stock: 100,
    is_active: true,
    requires_quote: false,
    sku: "SM-4U60-STG"
  },
  {
    name: "Supermicro 2U 8-Bay Compute Server",
    description: "Powerful compute server with Intel Xeon 6521P processors (24C/48T), 256GB DDR5 RAM, and NVMe storage. Perfect for AI workloads and high-performance computing.",
    price: 15312.00,
    category: "enterprise-hardware",
    image_url: "/images/store/server-compute.jpg",
    stock: 150,
    is_active: true,
    requires_quote: false,
    sku: "SM-2U8-CMP"
  },
  {
    name: "Supermicro 2U High-Performance Compute",
    description: "Premium compute server with dual Intel Xeon processors, 512GB DDR5 RAM, and ultra-fast NVMe storage. Designed for demanding AI and ML workloads.",
    price: 22517.00,
    category: "enterprise-hardware",
    image_url: "/images/store/server-hpc.jpg",
    stock: 50,
    is_active: true,
    requires_quote: false,
    sku: "SM-2U-HPC"
  },
  {
    name: "NVIDIA ConnectX-7 VPI 200Gb/s",
    description: "Industry-leading network adapter with 200Gb/s InfiniBand and Ethernet connectivity. NDR InfiniBand support for maximum data center performance.",
    price: 1850.00,
    category: "enterprise-hardware",
    image_url: "/images/store/nvidia-connectx.jpg",
    stock: 500,
    is_active: true,
    requires_quote: false,
    sku: "NV-CX7-200"
  },
  {
    name: "Seagate Exos M 3+ 30TB HDD",
    description: "Enterprise-class 30TB hard drive with industry-leading capacity. Designed for hyperscale data centers with 2.5M hours MTBF.",
    price: 650.00,
    category: "enterprise-hardware",
    image_url: "/images/store/seagate-30tb.jpg",
    stock: 5000,
    is_active: true,
    requires_quote: false,
    sku: "SG-EXOS-30T"
  },
  {
    name: "Micron 7450 PRO 3.84TB NVMe SSD",
    description: "Data center NVMe SSD with exceptional performance and endurance. PCIe 4.0 x4 interface with up to 6,800 MB/s sequential read.",
    price: 425.00,
    category: "enterprise-hardware",
    image_url: "/images/store/micron-nvme.jpg",
    stock: 2000,
    is_active: true,
    requires_quote: false,
    sku: "MC-7450-4T"
  },

  // Software & Licenses
  {
    name: "ATHLYNX Pro Subscription",
    description: "Full access to ATHLYNX platform with advanced analytics, AI training bots, and priority support. Includes 500 AI credits monthly.",
    price: 29.99,
    category: "software",
    image_url: "/images/store/athlynx-pro.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "ATH-PRO-MO"
  },
  {
    name: "ATHLYNX Elite Subscription",
    description: "Premium tier with unlimited AI credits, video analysis, recruiting tools, and dedicated account manager. For serious athletes.",
    price: 99.99,
    category: "software",
    image_url: "/images/store/athlynx-elite.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "ATH-ELT-MO"
  },
  {
    name: "AI Credits Pack - 500",
    description: "500 AI credits for training plans, video analysis, recruiting insights, and more. Credits never expire.",
    price: 49.99,
    category: "software",
    image_url: "/images/store/ai-credits-500.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "AI-CRD-500"
  },
  {
    name: "AI Credits Pack - 2000",
    description: "2000 AI credits with 20% bonus. Best value for power users. Credits never expire.",
    price: 149.99,
    category: "software",
    image_url: "/images/store/ai-credits-2000.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "AI-CRD-2K"
  },
  {
    name: "White-Label Sport App License",
    description: "License to deploy ATHLYNX-powered app for your sport, league, or organization. Includes customization and 1-year support.",
    price: 0,
    category: "software",
    image_url: "/images/store/white-label.jpg",
    stock: 100,
    is_active: true,
    requires_quote: true,
    sku: "WL-APP-LIC"
  },
  {
    name: "Enterprise API Access",
    description: "Full API access for integration with your existing systems. Includes developer support and SLA guarantee.",
    price: 0,
    category: "software",
    image_url: "/images/store/api-access.jpg",
    stock: 100,
    is_active: true,
    requires_quote: true,
    sku: "ENT-API-ACC"
  },

  // Data Center Packages
  {
    name: "Starter Data Center Package",
    description: "Entry-level data center solution with 10 compute servers, 5 storage servers, networking, and 1-year support. Perfect for growing businesses.",
    price: 0,
    category: "data-center",
    image_url: "/images/store/dc-starter.jpg",
    stock: 10,
    is_active: true,
    requires_quote: true,
    sku: "DC-START"
  },
  {
    name: "Professional Data Center Package",
    description: "Mid-tier solution with 50 compute servers, 20 storage servers, redundant networking, and 3-year support. Ideal for enterprises.",
    price: 0,
    category: "data-center",
    image_url: "/images/store/dc-pro.jpg",
    stock: 10,
    is_active: true,
    requires_quote: true,
    sku: "DC-PRO"
  },
  {
    name: "Enterprise Data Center Package",
    description: "Full-scale data center deployment with 200+ servers, petabyte storage, NVIDIA networking, and dedicated support team. For hyperscale operations.",
    price: 0,
    category: "data-center",
    image_url: "/images/store/dc-enterprise.jpg",
    stock: 5,
    is_active: true,
    requires_quote: true,
    sku: "DC-ENT"
  },
  {
    name: "Custom Data Center Solution",
    description: "Fully customized data center designed to your specifications. Includes site assessment, design, deployment, and ongoing management.",
    price: 0,
    category: "data-center",
    image_url: "/images/store/dc-custom.jpg",
    stock: 100,
    is_active: true,
    requires_quote: true,
    sku: "DC-CUSTOM"
  },

  // Support & Maintenance
  {
    name: "3-Year Extended Warranty",
    description: "Extend your hardware warranty to 3 years with parts replacement and technical support. Peace of mind for your investment.",
    price: 2500.00,
    category: "support",
    image_url: "/images/store/warranty-3yr.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "WAR-3YR"
  },
  {
    name: "24/7 Technical Support",
    description: "Round-the-clock technical support with 1-hour response time. Includes remote diagnostics and priority escalation.",
    price: 5000.00,
    category: "support",
    image_url: "/images/store/support-247.jpg",
    stock: 999999,
    is_active: true,
    requires_quote: false,
    sku: "SUP-247"
  },
  {
    name: "On-Site Service Contract",
    description: "Next business day on-site service for hardware issues. Includes parts and labor. Available nationwide.",
    price: 0,
    category: "support",
    image_url: "/images/store/onsite-service.jpg",
    stock: 100,
    is_active: true,
    requires_quote: true,
    sku: "SVC-ONSITE"
  },
  {
    name: "Managed Services Package",
    description: "Full IT management including monitoring, updates, security, and optimization. Let us handle your infrastructure.",
    price: 0,
    category: "support",
    image_url: "/images/store/managed-svc.jpg",
    stock: 50,
    is_active: true,
    requires_quote: true,
    sku: "SVC-MANAGED"
  },

  // AI Companions (Fuel Bots)
  {
    name: "Fuel Bot - Sports Trainer",
    description: "AI-powered training companion for athletes. Runs drills, provides real-time coaching, and tracks performance. All-terrain capable.",
    price: 0,
    category: "ai-companions",
    image_url: "/images/store/fuelbot-trainer.jpg",
    stock: 50,
    is_active: true,
    requires_quote: true,
    sku: "FB-TRAINER"
  },
  {
    name: "Fuel Bot - Medical Response",
    description: "Emergency response companion with AED delivery, first aid supplies, and real-time medical guidance. 30% faster response time.",
    price: 0,
    category: "ai-companions",
    image_url: "/images/store/fuelbot-medical.jpg",
    stock: 50,
    is_active: true,
    requires_quote: true,
    sku: "FB-MEDICAL"
  },
  {
    name: "Fuel Bot - Stadium Operations",
    description: "Multi-purpose companion for stadium operations including security patrol, delivery, and fan assistance. 24/7 autonomous operation.",
    price: 0,
    category: "ai-companions",
    image_url: "/images/store/fuelbot-stadium.jpg",
    stock: 30,
    is_active: true,
    requires_quote: true,
    sku: "FB-STADIUM"
  },
  {
    name: "Fuel Bot - Data Center",
    description: "Autonomous companion for data center operations. Monitoring, inspection, and maintenance assistance. IP66 rated.",
    price: 0,
    category: "ai-companions",
    image_url: "/images/store/fuelbot-datacenter.jpg",
    stock: 100,
    is_active: true,
    requires_quote: true,
    sku: "FB-DC"
  },
  {
    name: "Fuel Bot - Energy & Industrial",
    description: "Heavy-duty companion for energy facilities, power stations, and industrial sites. Geothermal and hazardous environment capable.",
    price: 0,
    category: "ai-companions",
    image_url: "/images/store/fuelbot-energy.jpg",
    stock: 50,
    is_active: true,
    requires_quote: true,
    sku: "FB-ENERGY"
  },

  // Sports Equipment
  {
    name: "Diamond Grind Training Kit",
    description: "Complete baseball training kit with weighted balls, resistance bands, and training guide. Used by elite players.",
    price: 149.99,
    category: "sports-equipment",
    image_url: "/images/store/dg-kit.jpg",
    stock: 500,
    is_active: true,
    requires_quote: false,
    sku: "DG-KIT-01"
  },
  {
    name: "ATHLYNX Smart Sensor Pack",
    description: "Wearable sensors for tracking performance metrics. Compatible with all ATHLYNX apps. Includes 3 sensors and charging case.",
    price: 299.99,
    category: "sports-equipment",
    image_url: "/images/store/sensor-pack.jpg",
    stock: 300,
    is_active: true,
    requires_quote: false,
    sku: "ATH-SENS-3"
  },
  {
    name: "Pro Training Cones (Set of 50)",
    description: "Professional-grade training cones for agility drills. High-visibility colors, durable construction.",
    price: 34.99,
    category: "sports-equipment",
    image_url: "/images/store/cones-50.jpg",
    stock: 1000,
    is_active: true,
    requires_quote: false,
    sku: "TRN-CONE-50"
  },
  {
    name: "Resistance Band Set",
    description: "Complete resistance band set with 5 levels. Perfect for warm-ups, strength training, and rehabilitation.",
    price: 29.99,
    category: "sports-equipment",
    image_url: "/images/store/bands-set.jpg",
    stock: 2000,
    is_active: true,
    requires_quote: false,
    sku: "TRN-BAND-5"
  }
];

async function seedProducts() {
  console.log('Connecting to database...');
  
  const connection = await mysql.createConnection(DATABASE_URL);
  
  try {
    // Check if products already exist
    const [existing] = await connection.execute('SELECT COUNT(*) as count FROM products');
    const count = existing[0].count;
    
    if (count > 0) {
      console.log(`Database already has ${count} products. Clearing existing products...`);
      await connection.execute('DELETE FROM products');
    }
    
    console.log(`Seeding ${products.length} products...`);
    
    for (const product of products) {
      await connection.execute(
        `INSERT INTO products (name, description, price, category, image_url, stock, is_active, requires_quote, sku, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.image_url,
          product.stock,
          product.is_active,
          product.requires_quote,
          product.sku
        ]
      );
      console.log(`  ✓ Added: ${product.name}`);
    }
    
    console.log(`\n✅ Successfully seeded ${products.length} products!`);
    
    // Show summary by category
    const [summary] = await connection.execute(
      'SELECT category, COUNT(*) as count FROM products GROUP BY category'
    );
    
    console.log('\nProducts by category:');
    for (const row of summary) {
      console.log(`  ${row.category}: ${row.count}`);
    }
    
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedProducts().catch(console.error);

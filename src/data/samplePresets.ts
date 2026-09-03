import { BusinessType, ExtractedFacts } from '../types';

export interface PresetDemo {
  id: string;
  title: string;
  titleHi: string;
  businessType: BusinessType;
  tagline: string;
  voiceScriptHi: string;
  voiceScriptEn: string;
  facts: ExtractedFacts;
}

export const SAMPLE_PRESETS: PresetDemo[] = [
  {
    id: 'dairy-barabanki',
    title: 'Dairy Enterprise (दुग्ध व्यवसाय)',
    titleHi: 'दुग्ध व्यवसाय (डेयरी फ़ार्मिंग)',
    businessType: 'dairy',
    tagline: '5-10 Buffalo milk unit with local cooperative supply',
    voiceScriptHi: 'नमस्ते भैया, मेरे पास 1 लाख रुपया जमा पूंजी है और बाराबंकी के हैदरगढ़ गांव में डेयरी का काम शुरू करना चाहता हूँ।',
    voiceScriptEn: 'Namaste brother, I have 1 Lakh rupees savings and want to start a dairy farming business in Haidergarh village, Barabanki.',
    facts: {
      business: 'dairy',
      businessName: 'Radhey Krishna Dairy Farm',
      marginCapital: 100000,
      village: 'Haidergarh',
      block: 'Haidergarh',
      district: 'Barabanki',
      state: 'Uttar Pradesh',
      latitude: 26.5888,
      longitude: 81.3857,
      formattedAddress: 'Haidergarh, Barabanki District, Uttar Pradesh 225126',
      experienceYears: 4,
      hasLandOrShop: true,
      electricityReliable: true,
      existingLoans: 0,
      applicantName: 'Rameshwar Yadav',
      applicantPhone: '+91 98391 24789'
    }
  },
  {
    id: 'grocery-madhubani',
    title: 'Village Grocery & Kirana (किराना दुकान)',
    titleHi: 'ग्राम्य किराना एवं जनरल स्टोर',
    businessType: 'grocery',
    tagline: 'FMCG, daily essentials and grains near Panchayat Bhavan',
    voiceScriptHi: 'हमारे पास साठ हजार रुपये हैं, मधुबनी के बेनीपट्टी में मुख्य सड़क पर पक्की किराना दुकान खोलनी है।',
    voiceScriptEn: 'I have 60,000 rupees and want to open a grocery general store near the main road in Benipatti, Madhubani.',
    facts: {
      business: 'grocery',
      businessName: 'Maa Janaki Kirana Bhandar',
      marginCapital: 60000,
      village: 'Benipatti',
      block: 'Benipatti',
      district: 'Madhubani',
      state: 'Bihar',
      latitude: 26.4716,
      longitude: 85.9221,
      formattedAddress: 'Benipatti, Madhubani District, Bihar 847223',
      experienceYears: 3,
      hasLandOrShop: true,
      electricityReliable: true,
      existingLoans: 0,
      applicantName: 'Sanjay Kumar Mahto',
      applicantPhone: '+91 94314 88231'
    }
  },
  {
    id: 'tailoring-belagavi',
    title: 'Tailoring & Garments (सिलाई एवं वस्त्र केंद्र)',
    titleHi: 'सिलाई केंद्र एवं बुटीक',
    businessType: 'tailoring',
    tagline: 'School uniform manufacturing & embroidery center',
    voiceScriptHi: 'मुझे सिलाई का 5 साल का तजुर्बा है, 40 हजार रुपये हैं। चिकोड़ी गांव में स्कूल ड्रेस और लेडीज बुटीक शुरू करना है।',
    voiceScriptEn: 'I have 5 years tailoring experience and 40,000 rupees capital. Want to start uniform stitching and ladies boutique in Chikodi.',
    facts: {
      business: 'tailoring',
      businessName: 'Pragati Stitching & Embroidery Center',
      marginCapital: 40000,
      village: 'Chikodi',
      block: 'Chikodi',
      district: 'Belagavi',
      state: 'Karnataka',
      latitude: 16.4312,
      longitude: 74.5982,
      formattedAddress: 'Chikodi, Belagavi District, Karnataka 591201',
      experienceYears: 5,
      hasLandOrShop: false,
      electricityReliable: true,
      existingLoans: 0,
      applicantName: 'Sunita Devi Patil',
      applicantPhone: '+91 97422 19045'
    }
  },
  {
    id: 'mobile-alwar',
    title: 'Mobile & Solar Repair (मोबाइल एवं सोलर रिपेयरिंग)',
    titleHi: 'मोबाइल एवं इलेक्ट्रॉनिक रिपेयर केंद्र',
    businessType: 'mobile_repair',
    tagline: 'Smartphone repair, accessories & solar inverter maintenance',
    voiceScriptHi: 'मैंने आईटीआई की है, 50 हजार रुपये हैं। तिजारा में मोबाइल रिपेयरिंग और ऑनलाइन सर्विस सेंटर खोलना चाहता हूँ।',
    voiceScriptEn: 'I completed ITI diploma, have 50,000 rupees margin. Want to start a mobile repair and digital kiosk in Tijara.',
    facts: {
      business: 'mobile_repair',
      businessName: 'Digital Bharat Mobile Care',
      marginCapital: 50000,
      village: 'Tijara',
      block: 'Tijara',
      district: 'Alwar',
      state: 'Rajasthan',
      latitude: 27.9332,
      longitude: 76.8524,
      formattedAddress: 'Tijara, Alwar District, Rajasthan 301411',
      experienceYears: 2,
      hasLandOrShop: true,
      electricityReliable: true,
      existingLoans: 15000,
      applicantName: 'Mohd. Imran Khan',
      applicantPhone: '+91 91662 33419'
    }
  },
  {
    id: 'food-nashik',
    title: 'Food & Agro Processing (खाद्य प्रसंस्करण)',
    titleHi: 'एग्रो एवं मिलेट प्रसंस्करण इकाई',
    businessType: 'food_processing',
    tagline: 'Mini flour mill, onion dehydration & tomato puree packing',
    voiceScriptHi: 'मेरे पास 1.5 लाख रुपये हैं, डिंडोरी में प्याज और टमाटर की मिनी प्रोसेसिंग और पैकेजिंग यूनिट लगानी है।',
    voiceScriptEn: 'I have 1.5 Lakh rupees margin, want to establish a mini agro-processing unit for onions and tomatoes in Dindori.',
    facts: {
      business: 'food_processing',
      businessName: 'Sahyadri Gramin Agro Processors',
      marginCapital: 150000,
      village: 'Dindori',
      block: 'Dindori',
      district: 'Nashik',
      state: 'Maharashtra',
      latitude: 20.2039,
      longitude: 73.8329,
      formattedAddress: 'Dindori, Nashik District, Maharashtra 422202',
      experienceYears: 6,
      hasLandOrShop: true,
      electricityReliable: true,
      existingLoans: 0,
      applicantName: 'Ganesh Bhau Shinde',
      applicantPhone: '+91 98220 54102'
    }
  }
];

export const BUSINESS_DETAILS: Record<BusinessType, {
  nameEn: string;
  nameHi: string;
  icon: string;
  defaultCostMultiplier: number;
  capexItems: string[];
  schemes: string[];
  mandiItems: string[];
}> = {
  dairy: {
    nameEn: 'Dairy Farming & Milk Chilling',
    nameHi: 'डेयरी फ़ार्मिंग एवं दुग्ध शीतलन',
    icon: 'Milk',
    defaultCostMultiplier: 10,
    capexItems: ['Milch Animals (Buffaloes/Cows)', 'Cattle Shed Construction', 'Chaff Cutter & Milking Machine', 'Feed Storage & Initial Silage'],
    schemes: ['PMEGP', 'NABARD DEDS', 'Kisan Credit Card (Dairy)', 'Mudra Tarun'],
    mandiItems: ['Raw Cow Milk', 'Buffalo Milk', 'Dry Fodder / Bhusa', 'Green Cattle Feed']
  },
  grocery: {
    nameEn: 'Village Grocery & Provision Store',
    nameHi: 'किराना एवं दैनिक आवश्यकता स्टोर',
    icon: 'Store',
    defaultCostMultiplier: 10,
    capexItems: ['Shop Shelving & Display Racks', 'Electronic Weighing Scale & POS', 'Initial FMCG & Grain Inventory', 'Refrigerated Cold Beverage Showcase'],
    schemes: ['Mudra Kishore', 'PMMY Shishu', 'NRLM Micro Credit', 'PM SVANidhi'],
    mandiItems: ['Basmati / Sona Masoori Rice', 'Wheat Flour / Atta', 'Mustard Oil', 'Sugar & Pulses']
  },
  tailoring: {
    nameEn: 'Tailoring & School Uniform Center',
    nameHi: 'सिलाई एवं गारमेंट निर्माण केंद्र',
    icon: 'Scissors',
    defaultCostMultiplier: 8,
    capexItems: ['Heavy-duty Industrial Sewing Machines (Juki/Singer)', 'Overlock & Interlock Stitching Units', 'Cutting Table & Cloth Inventory', 'Pressing & Ironing Station'],
    schemes: ['Mudra Shishu / Kishore', 'PMEGP Service Unit', 'Stand-Up India (Women)'],
    mandiItems: ['Cotton Fabric Reams', 'Polyester Blends', 'Thread Spools & Zippers', 'School Uniform Suiting']
  },
  mobile_repair: {
    nameEn: 'Smartphone Repair & Digital Center',
    nameHi: 'मोबाइल रिपेयर एवं डिजिटल सेवा केंद्र',
    icon: 'Smartphone',
    defaultCostMultiplier: 8,
    capexItems: ['SMD Rework Station & Soldering Lab', 'Display Separator & Microscope', 'Diagnostic Multimeter & Toolkits', 'Screen, Battery & Charger Spares'],
    schemes: ['Mudra Kishore', 'PMEGP Service', 'PMMY Shishu'],
    mandiItems: ['Display LCD Panels', 'Lithium Batteries', 'Charging IC Components', 'Solar Inverter Cards']
  },
  food_processing: {
    nameEn: 'Agro & Food Processing Micro Unit',
    nameHi: 'कृषि एवं खाद्य प्रसंस्करण लघु उद्योग',
    icon: 'Wheat',
    defaultCostMultiplier: 10,
    capexItems: ['Pulverizer & Grinding Mill', 'Dehydrator / Solar Dryer', 'Automatic Vacuum Packaging Machine', 'FSSAI Food Grade Storage Bins'],
    schemes: ['PMFME (35% Capital Subsidy)', 'PMEGP Manufacturing', 'Mudra Tarun', 'NABARD Rural Infra'],
    mandiItems: ['Millet Grains', 'Spices & Condiments', 'Fresh Tomatoes/Onions', 'Food Grade Packaging Pouches']
  }
};

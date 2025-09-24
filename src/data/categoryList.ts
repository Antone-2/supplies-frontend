import {
    LuStethoscope,
    LuSyringe,
    LuShield,
    LuPill,
    LuPackage,
    LuHeart,
    LuActivity,
    // ...existing code...
    LuDroplet,
    LuWind,
    LuBandage,
    LuAmbulance,
    LuBed,
    LuBone
} from 'react-icons/lu';

export interface CategoryDefinition {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
}

export const categoryList: CategoryDefinition[] = [
    {
        id: 'diagnostic-equipment',
        name: 'Diagnostic Equipment',
        description: 'Stethoscopes, BP monitors, thermometers & more',
        icon: LuStethoscope,
        color: 'from-blue-500 to-cyan-400',
    },
    {
        id: 'surgical-instruments',
        name: 'Surgical Instruments',
        description: 'Precision tools for medical procedures',
        icon: LuSyringe,
        color: 'from-red-500 to-pink-400',
    },
    {
        id: 'patient-care',
        name: 'Patient Care',
        description: 'Comfort items, beddings, and care essentials',
        icon: LuHeart,
        color: 'from-pink-500 to-fuchsia-400',
    },
    {
        id: 'safety-ppe',
        name: 'Safety & PPE',
        description: 'Protective equipment for healthcare safety',
        icon: LuShield,
        color: 'from-green-500 to-emerald-400',
    },
    {
        id: 'pharmaceuticals',
        name: 'Pharmaceuticals',
        description: 'Medications and therapeutic solutions',
        icon: LuPill,
        color: 'from-purple-500 to-indigo-400',
    },
    {
        id: 'medical-supplies',
        name: 'Medical Supplies',
        description: 'First aid, bandages, and essential supplies',
        icon: LuPackage,
        color: 'from-orange-500 to-yellow-400',
    },
    {
        id: 'diagnostics',
        name: 'Diagnostics',
        description: 'Diagnostic tools and equipment',
        icon: LuStethoscope,
        color: 'from-blue-500 to-cyan-400',
    },
    {
        id: 'emergency',
        name: 'Emergency',
        description: 'Emergency medical supplies',
        icon: LuAmbulance,
        color: 'from-orange-600 to-red-400',
    },
    {
        id: 'infusion',
        name: 'Infusion',
        description: 'Infusion and IV products',
        icon: LuDroplet,
        color: 'from-purple-500 to-indigo-400',
    },
    {
        id: 'mobility',
        name: 'Mobility',
        description: 'Mobility aids and equipment',
        icon: LuActivity,
        color: 'from-yellow-500 to-amber-400',
    },
    {
        id: 'protection',
        name: 'Protection',
        description: 'Protective gear and PPE',
        icon: LuShield,
        color: 'from-green-500 to-emerald-400',
    },
    {
        id: 'respiratory',
        name: 'Respiratory',
        description: 'Respiratory care products',
        icon: LuWind,
        color: 'from-cyan-500 to-blue-400',
    },
    {
        id: 'wound-care',
        name: 'Wound Care',
        description: 'Wound care and bandages',
        icon: LuBandage,
        color: 'from-pink-500 to-fuchsia-400',
    },
    {
        id: 'consumables',
        name: 'Consumables',
        description: 'Medical consumables and disposable supplies',
        icon: LuPill,
        color: 'from-green-500 to-emerald-400',
    },
    {
        id: 'walking-aids',
        name: 'Walking Aids',
        description: 'Mobility aids and walking assistance equipment',
        icon: LuActivity,
        color: 'from-blue-500 to-cyan-400',
    },
    {
        id: 'hospital-furnitures',
        name: 'Hospital Furnitures',
        description: 'Hospital furniture and medical equipment',
        icon: LuBed,
        color: 'from-purple-500 to-indigo-400',
    },
    {
        id: 'orthopedics',
        name: 'Orthopedics',
        description: 'Orthopedic supplies and rehabilitation equipment',
        icon: LuBone,
        color: 'from-orange-500 to-yellow-400',
    },
    // Add more categories as needed
];

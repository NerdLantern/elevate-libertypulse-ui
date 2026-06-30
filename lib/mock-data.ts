export type Category =
  | 'Retailer'
  | 'Distributor'
  | 'Broker'
  | 'Manufacturing / Supply Chain'

export type ProspectStatus =
  | 'Targeted'
  | 'Contacted'
  | 'Meeting Set'
  | 'Proposal'
  | 'Won'
  | 'Lost'

export interface Contact {
  id: string
  firstName: string
  lastName: string
  title: string
  category: Category
  company: string
  companyScope?: string
  email: string
  phone?: string
  status?: ProspectStatus
  lastContact?: string
  nextMeeting?: string
  notes?: string
}

export interface SalesRep {
  id: string
  name: string
  title: string
  product: string
  avatar: string
  quota: number
  ytdSales: string
  active: boolean
  vendors: number
  pipeline: string
  won30d: number
  winRate: number
  avgPulse: number
  rank: number
}

export const CATEGORIES: Category[] = [
  'Retailer',
  'Distributor',
  'Broker',
  'Manufacturing / Supply Chain',
]

export const STATUSES: ProspectStatus[] = [
  'Targeted',
  'Contacted',
  'Meeting Set',
  'Proposal',
  'Won',
  'Lost',
]

export const contacts: Contact[] = [
  { id: '1', firstName: 'Tyler', lastName: 'Amundsen', title: 'CAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'tyler.amundsen@sgws.com', status: 'Targeted' },
  { id: '2', firstName: 'Jim', lastName: 'Bower', title: 'General Sales Manager', category: 'Distributor', company: 'VA Imports', companyScope: 'ALL', email: 'jim@vaimports.net', status: 'Contacted' },
  { id: '3', firstName: 'Caitlin', lastName: 'Burdick', title: 'Senior Category Merchant', category: 'Retailer', company: 'Whole Foods', companyScope: 'ALL', email: 'burdicca@amazon.com', status: 'Meeting Set' },
  { id: '4', firstName: 'Mark', lastName: 'Cardelli', title: 'Regional CAM Boss', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'mcardelli@sgws.com', status: 'Proposal' },
  { id: '5', firstName: 'Matt', lastName: 'Carlstrom', title: 'National CAM Boss', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'matthewcarlstrom@sgws.com', status: 'Won' },
  { id: '6', firstName: 'Jeff', lastName: 'Coriat', title: 'CAM Director', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'jcorgiat@sgws.com', status: 'Targeted' },
  { id: '7', firstName: 'Carl', lastName: "D'Ambrose", title: 'VP Kroger', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'cdambrose@sgws.com', status: 'Contacted' },
  { id: '8', firstName: 'Tony', lastName: 'Dilg', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'anthony.dilg@sgws.com', status: 'Targeted' },
  { id: '9', firstName: 'Pat', lastName: 'Domonkos', title: 'Business Unit Director', category: 'Distributor', company: 'Lipman', companyScope: 'ALL', email: 'p.domonkos@lipmanbrothers.com', status: 'Meeting Set' },
  { id: '10', firstName: 'Nate', lastName: 'Faust', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'nathanfaust@sgws.com', status: 'Lost' },
  { id: '11', firstName: 'Brian', lastName: 'Findley', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'brianfindley@sgws.com', status: 'Targeted' },
  { id: '12', firstName: 'Alex', lastName: 'Fong', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'alexanderfong@sgws.com', status: 'Contacted' },
  { id: '13', firstName: 'Connor', lastName: 'Gau', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'connorgau@sgws.com', status: 'Proposal' },
  { id: '14', firstName: 'Eli', lastName: 'Grodin', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'eligrondin@sgws.com', status: 'Won' },
  { id: '15', firstName: 'Brett', lastName: 'Guerard', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'bguerard@sgws.com', status: 'Targeted' },
  { id: '16', firstName: 'Jay', lastName: 'Huffman', title: 'Buyer', category: 'Retailer', company: 'Kroger', companyScope: 'ALL', email: 'jay.huffman@kroger.com', status: 'Meeting Set' },
  { id: '17', firstName: 'Kristen', lastName: 'Johnson', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'kristenjohnson@sgws.com', status: 'Contacted' },
  { id: '18', firstName: 'Amanda', lastName: 'Kaczynski', title: 'Director Kroger', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'akaczynski@sgws.com', status: 'Targeted' },
  { id: '19', firstName: 'Doug', lastName: 'Mitchell', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'dougmitchell@sgws.com', status: 'Proposal' },
  { id: '20', firstName: 'Stuart', lastName: 'Nelson', title: 'National CAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'snelson@sgws.com', status: 'Won' },
  { id: '21', firstName: 'Mike', lastName: "O'Donnell", title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'michaelodonnell@sgws.com', status: 'Targeted' },
  { id: '22', firstName: 'Billy', lastName: 'Perkins', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'william.perkins@sgws.com', status: 'Contacted' },
  { id: '23', firstName: 'Jim', lastName: 'Peterson', title: 'KAM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'jamespeterson@sgws.com', status: 'Targeted' },
  { id: '24', firstName: 'Amanda', lastName: 'Proper', title: 'TDM', category: 'Distributor', company: 'Breakthru Bev', companyScope: 'ALL', email: 'aproper@breakthrubev.com', status: 'Meeting Set' },
  { id: '25', firstName: 'Chris', lastName: 'Rodgers', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'chrisrodgers@sgws.com', status: 'Lost' },
  { id: '26', firstName: 'Julia', lastName: 'Sellers', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'julia.sellers@sgws.com', status: 'Targeted' },
  { id: '27', firstName: 'Phil', lastName: 'Soo Kim', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'philsoo.kim@sgws.com', status: 'Contacted' },
  { id: '28', firstName: 'Scott', lastName: 'Stocum', title: 'DSD CAM Director', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'scottstocum@sgws.com', status: 'Proposal' },
  { id: '29', firstName: 'John', lastName: 'Stoszek', title: 'TDM', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'john.stoszek@sgws.com', status: 'Won' },
  { id: '30', firstName: 'Lina', lastName: 'Upegui', title: 'Replenishment Analyst', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'linaupegui@sgws.com', status: 'Targeted' },
  { id: '31', firstName: 'Louis', lastName: 'Zweig', title: 'SVP Commercial Operations', category: 'Distributor', company: 'SGWS', companyScope: 'ALL', email: 'lzweig@sgws.com', status: 'Meeting Set' },
]

export const salesReps: SalesRep[] = [
  { id: '1', name: 'Damien', title: 'Senior Rep', product: 'Spirits', avatar: '/avatars/rep-1.png', quota: 53, ytdSales: '$182K', active: true, vendors: 4, pipeline: '$48K', won30d: 3, winRate: 41, avgPulse: 78, rank: 1 },
  { id: '2', name: 'Mark', title: 'Account Exec', product: 'Wine', avatar: '/avatars/rep-2.png', quota: 69, ytdSales: '$240K', active: true, vendors: 6, pipeline: '$92K', won30d: 5, winRate: 52, avgPulse: 84, rank: 2 },
  { id: '3', name: 'Elena', title: 'Account Exec', product: 'Both', avatar: '/avatars/rep-3.png', quota: 82, ytdSales: '$311K', active: true, vendors: 8, pipeline: '$120K', won30d: 7, winRate: 61, avgPulse: 91, rank: 3 },
  { id: '4', name: 'Daniel', title: 'Rep', product: 'Spirits', avatar: '/avatars/rep-4.png', quota: 55, ytdSales: '$160K', active: true, vendors: 3, pipeline: '$40K', won30d: 2, winRate: 38, avgPulse: 72, rank: 4 },
  { id: '5', name: 'Kevin', title: 'Rep', product: 'Wine', avatar: '/avatars/rep-5.png', quota: 69, ytdSales: '$205K', active: true, vendors: 5, pipeline: '$66K', won30d: 4, winRate: 47, avgPulse: 80, rank: 5 },
  { id: '6', name: 'Daniel York', title: 'Sales Manager', product: 'Both', avatar: '/avatars/rep-6.png', quota: 68, ytdSales: '$25K', active: true, vendors: 2, pipeline: '$18K', won30d: 1, winRate: 33, avgPulse: 69, rank: 6 },
]

export const navItems = [
  { id: 'admin', label: 'Admin Panel', icon: 'shield' },
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'sales-reps', label: 'Sales Reps', icon: 'users' },
  { id: 'contacts', label: 'Contacts', icon: 'contact' },
  { id: 'brokers', label: 'Brokers', icon: 'briefcase' },
  { id: 'distributors', label: 'Distributors', icon: 'building' },
  { id: 'retailers', label: 'Retailers', icon: 'store' },
  { id: 'prospects', label: 'Prospects', icon: 'target' },
  { id: 'pipeline', label: 'Pipeline', icon: 'git-branch' },
  { id: 'map', label: 'Map', icon: 'map' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'inventory', label: 'Inventory', icon: 'box' },
] as const

export type NavId = (typeof navItems)[number]['id']

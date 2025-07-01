


export interface Category{
  id: number,
  name?: string,
  imageUrl?: string,
  description?: string,
  // xpCost: number,
}

export interface Courses {
  id: number,
  title: string,
  description: string,
  level: string,
  features: string[],
  courseOutLine: string,
  price: number,
  imageUrl: string,
  videoUrl: string,
  enrolledUser: number,
  category: Category,
  creator: User,
  createdAt?: string,


}

export interface Payment {
  id: number,
  userId: number,
  amount: number,
  mode: string,
  xpPurchased: number,
  purchasedAt: string,
}

export interface Transaction {
  id: number,
  user: User,
  course: Courses,
  type: string,
  amount: number,
  transactedAt: string,

}

export interface User{
  id: number,
  username: string,
  email?: string,
  password?: string,
  phone?: string,
  fullname?: string,
  xp?: number,
  avatarUrl ?: string,
  bio?: string,
  skills: string | null,
  region?: string,
  createdAt?:string,
  responseTime?: number,
}

export interface Enrollment{
  id: number,
  course: Courses,
  learner: User,
  enrollmentDate: string,

}

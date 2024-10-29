export interface ChartsInterface {
  fantasy: string
  title: string
  workHours: {
    week: string
    workTime: number
    workTimeRecommend: number
    workTimeService: number
    dailyProcedure?: number
    dailyIdleProcedure?: number
  }[]
}

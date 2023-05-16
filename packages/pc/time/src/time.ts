export type TimeProps = {
  /** 要格式化的时间 */
  time: string | number | Date;
  /** 格式化的方式 */
  mode?: 'relative' | 'date' | 'datetime';
  /** 定时刷新：step 表示定时刷新的秒数，仅相对时间有效 */
  step?: number;
};

export type geralJobType = {
  qtyTotalJob: number;
  projectHighHoursJob: (string | number)[];
  projectLowHoursJob: (string | number)[];
  monthHighHoursJob: (string | number)[];
  monthLowHoursJob: (string | number)[];
  userHighHoursJob: (string | number)[];
  userLowHoursJob: (string | number)[];
};

export type ProjectJobType = {
  name: string;
  qtyTotalJob: number;
  monthHighHoursJob: (string | number)[];
  monthLowHoursJob: (string | number)[];
  userHighHoursJob: (string | number)[];
  userLowHoursJob: (string | number)[];
};

export type UserJobType = {
  name: string;
  qtyTotalJob: number;
  projectHighHoursJob: (string | number)[];
  projectLowHoursJob: (string | number)[];
  monthHighHoursJob: (string | number)[];
  monthLowHoursJob: (string | number)[];
};

export type MonthJobType = {
  name: string;
  qtyTotalJob: number;
  projectHighHoursJob: (string | number)[];
  projectLowHoursJob: (string | number)[];
  userHighHoursJob: (string | number)[];
  userLowHoursJob: (string | number)[];
};

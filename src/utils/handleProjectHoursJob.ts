import { hoursType } from '../pages/Home/dto';
import { projectType } from '../pages/HoursRegistration/dto';

function handleProjectHoursJob(
  element: hoursType,
  arrProjectHoursJob: (string | number)[][],
  arrProjects: projectType[],
): void {
  arrProjects.forEach((project) => {
    if (project._id === element.project) {
      let arrIndex = -1;

      arrProjectHoursJob.forEach((val, index) => {
        if (val[0] === project.name) {
          arrIndex = index;
          return;
        }
      });

      if (arrIndex === -1) {
        if (arrProjectHoursJob[1][0] === 'Default') {
          arrProjectHoursJob[1][0] = project.name;
          arrProjectHoursJob[1][1] = element.hours;
        } else {
          arrProjectHoursJob.push([project.name, element.hours]);
        }
      } else {
        const qtdHours = +arrProjectHoursJob[arrIndex][1];
        arrProjectHoursJob[arrIndex][1] = qtdHours + +element.hours;
      }
    }
  });
}

export default handleProjectHoursJob;

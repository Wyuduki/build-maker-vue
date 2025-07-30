const path: Record<string, string> = {};

class Path {
  project: string = '\\..\\..\\data\\';
  save: string = '\\..\\..\\data\\save\\';
  emptyImg: string = '.\\..\\..\\data\\';
  build: string = '\\..\\..\\data\\save\\<projectname>\\';
  setting: string = '\\..\\..\\data\\save\\<projectname>\\';
  image: string = '.\\..\\data\\<dataname>\\image\\';
  list: string = '\\..\\..\\data\\<dataname>\\json\\';
  initialize(projectName: string, dataName: string): void {
    this.project;
    this.save;
    this.emptyImg;
    this.build = this.build.replace('<projectname>', projectName);
    this.setting = this.setting.replace('<projectname>', projectName);
    this.image = this.image.replace('<dataname>', dataName);
    this.list = this.list.replace('<dataname>', dataName);
  }
}

export default new Path();

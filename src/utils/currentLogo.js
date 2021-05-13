import Apple from "../assets/apple.png";
import Acer from "../assets/acer.png";
import Asus from "../assets/asus.png";
import MSI from "../assets/msi.png";
import Lenovo from "../assets/lenovo.png";
import Dell from "../assets/dell.png";
import Huawei from "../assets/huawei.png";
import HP from "../assets/hp.png";
import Honor from "../assets/honor.png";

export const currentLogo = (categoryId) => {
  switch (categoryId) {
    case 1:
      return Apple;
    case 2:
      return Acer;
    case 3:
      return Asus;
    case 4:
      return MSI;
    case 5:
      return Lenovo;
    case 6:
      return Dell;
    case 7:
      return Huawei;
    case 8:
      return HP;
    case 9:
      return Honor;
    default:
      return "oops";
  }
};

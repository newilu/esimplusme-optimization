import "styled-components";
import themes from "@/shared/ui/themes";

declare module "styled-components" {
  export type DefaultTheme = typeof themes.light;
}

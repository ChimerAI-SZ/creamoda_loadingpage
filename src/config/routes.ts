// 路由路径到主题ID的映射
export const routeToThemeMap: Record<string, string> = {
  'image-background-remover': 'background_remove',
  'image-background-changer': 'background_change',
  'image-enhancer': 'image_enhance',
  'image-changer': 'partial_modify',
  'image-color-changer': 'color_change',
  'virtual-try-on': 'virtual_try',
  'outfit-generator': 'outfit_generator',
  'sketch-to-image': 'sketch_convert'
};

// 主题ID到路由路径的映射（反向映射）
export const themeToRouteMap: Record<string, string> = {
  'background_remove': 'image-background-remover',
  'background_change': 'image-background-changer',
  'image_enhance': 'image-enhancer',
  'partial_modify': 'image-changer',
  'color_change': 'image-color-changer',
  'virtual_try': 'virtual-try-on',
  'outfit_generator': 'outfit-generator',
  'sketch_convert': 'sketch-to-image'
};

// 获取主题ID by 路由路径
export function getThemeByRoute(route: string): string {
  return routeToThemeMap[route] || 'background_remove';
}

// 获取路由路径 by 主题ID
export function getRouteByTheme(themeId: string): string {
  return themeToRouteMap[themeId] || 'image-background-remover';
}

// 获取所有可用路由
export function getAllRoutes(): string[] {
  return Object.keys(routeToThemeMap);
} 
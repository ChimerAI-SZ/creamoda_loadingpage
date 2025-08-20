import { redirect } from 'next/navigation';
import { getRouteByTheme } from '@/config/routes';

export default function Home() {
  // 重定向到默认主题路径
  const defaultRoute = getRouteByTheme('background_remove');
  redirect(`/${defaultRoute}`);
}

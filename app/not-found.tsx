import { Train, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen bg-background items-center justify-center px-4">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
          <Train className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">找不到页面</h1>
          <p className="text-muted-foreground">
            您访问的页面不存在或已被移除
          </p>
        </div>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-colors min-h-[44px]"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">返回主页</span>
        </Link>
        
        <p className="text-sm text-muted-foreground">
          如有问题请联系：<Link href="mailto:pioet@aliyun.com" className="text-primary hover:underline">pioet@aliyun.com</Link>
        </p>
      </div>
    </div>
  );
}
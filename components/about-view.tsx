"use client";

import { BUILD_DATE } from "@/lib/build-info";

export function AboutView() {
  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="px-4 py-6 space-y-5">
        {/* 关于 */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">关于</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            京铁门儿清是一款提供北京地铁站内设施信息的导航助手。通过精确到车门的对位指引，助您在复杂的车站中瞬时锁定换乘捷径、直达目标出口、秒寻应急设施。
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">项目仓库：</span>
              <a
                href="https://github.com/pioet/bjs-clear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://github.com/pioet/bjs-clear
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">编译日期：</span>
              <span className="text-foreground">{BUILD_DATE}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">作者：</span>
              <span className="text-foreground">pioet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">邮箱：</span>
              <a
                href="mailto:pioet@aliyun.com"
                className="text-primary hover:underline"
              >
                pioet@aliyun.com
              </a>
            </div>
          </div>
        </section>

        {/* 致谢 */}
        <section className="border-t border-border pt-5">
          <h2 className="text-base font-bold text-foreground mb-3">致谢</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>
                数据来源：
                <span className="text-foreground">
                  北京轨道交通乘换引导@金安桥到平安里，高德地图
                </span>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>
                特别鸣谢：<span className="text-foreground">@-鴻菲-</span>
              </span>
            </p>
          </div>
        </section>

        {/* 声明 */}
        <section className="border-t border-border pt-5">
          <h2 className="text-base font-bold text-foreground mb-3">声明</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              本作品采用{" "}
              <span className="text-foreground font-medium">
                CC BY-NC-SA（署名-非商业性-相同方式共享）4.0
              </span>{" "}
              协议。
            </p>
            <p>
              本作品提供的信息仅供参考，不对因使用本作品信息造成的任何损失承担责任。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

import colorData from "@/data/color.json";
import lineData from "@/data/line.json";
import transferJson from "@/data/transfer.json";
import line1 from "@/data/detail/1号线.json";
import line2 from "@/data/detail/2号线.json";
import line3 from "@/data/detail/3号线.json";
import line4 from "@/data/detail/4号线.json";
import line5 from "@/data/detail/5号线.json";
import line6 from "@/data/detail/6号线.json";
import line7 from "@/data/detail/7号线.json";
import line8 from "@/data/detail/8号线.json";
import line9 from "@/data/detail/9号线.json";
import line10 from "@/data/detail/10号线.json";
import line11 from "@/data/detail/11号线.json";
import line12 from "@/data/detail/12号线.json";
import line13 from "@/data/detail/13号线.json";
import line14 from "@/data/detail/14号线.json";
import line15 from "@/data/detail/15号线.json";
import line16 from "@/data/detail/16号线.json";
import line17 from "@/data/detail/17号线.json";
import line18 from "@/data/detail/18号线.json";
import line19 from "@/data/detail/19号线.json";
import lineYizhuang from "@/data/detail/亦庄线.json";
import lineFangshan from "@/data/detail/房山线.json";
import lineChangping from "@/data/detail/昌平线.json";
import lineYanfang from "@/data/detail/燕房线.json";
import lineDaxing from "@/data/detail/大兴机场线.json";
import lineShoudu from "@/data/detail/首都机场线.json";

export interface TomlLineData {
  line_name: string;
  carriage_num: number;
  door_num: number;
  directions: string[];
  stations: Array<{
    name: string;
    up?: {
      time: string[];
      arrival: number;
      side: string;
      doors: Record<string, string[]>;
    };
    down?: {
      time: string[];
      arrival: number;
      side: string;
      doors: Record<string, string[]>;
    };
  }>;
}

export const lineColors: Record<string, string> = colorData;
export const lineStations: Record<string, string[]> = lineData;
export const transferData: Record<string, string[]> = transferJson;

export const lineDetailData: Record<string, TomlLineData> = {
  "1号线": line1 as TomlLineData,
  "2号线": line2 as TomlLineData,
  "3号线": line3 as TomlLineData,
  "4号线": line4 as TomlLineData,
  "5号线": line5 as TomlLineData,
  "6号线": line6 as TomlLineData,
  "7号线": line7 as TomlLineData,
  "8号线": line8 as TomlLineData,
  "9号线": line9 as TomlLineData,
  "10号线": line10 as TomlLineData,
  "11号线": line11 as TomlLineData,
  "12号线": line12 as TomlLineData,
  "13号线": line13 as TomlLineData,
  "14号线": line14 as TomlLineData,
  "15号线": line15 as TomlLineData,
  "16号线": line16 as TomlLineData,
  "17号线": line17 as TomlLineData,
  "18号线": line18 as TomlLineData,
  "19号线": line19 as TomlLineData,
  "亦庄线": lineYizhuang as TomlLineData,
  "房山线": lineFangshan as TomlLineData,
  "昌平线": lineChangping as TomlLineData,
  "燕房线": lineYanfang as TomlLineData,
  "大兴机场线": lineDaxing as TomlLineData,
  "首都机场线": lineShoudu as TomlLineData,
};
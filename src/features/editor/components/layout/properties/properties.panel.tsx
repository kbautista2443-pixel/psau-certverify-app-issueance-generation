import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvasStore } from "../../../lib/stores/canvas-store";
import { Panel } from "../../panels/editor-panel";
import { ObjectProperties } from "./object.properties";
import { PageProperties } from "./page.properties";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { insertImage } from "@/features/editor/helper/insert-default-template";

const Properties = () => {
  const canvas = useCanvasStore((s) => s.canvas);
  return (
    <Panel className="top-1/2 right-2 max-w-60 min-w-60 -translate-y-1/2">
      <ScrollArea className="block h-120 w-full space-y-4 p-2">
        <Settings />
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-4 shadow-md p-1 border rounded w-full">
            Select Default Template
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => canvas && insertImage(canvas, "folderA")}>
              Certificate of Achievement
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => canvas && insertImage(canvas, "folderB")}>
              Certificate of Participation
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => canvas && insertImage(canvas, "folderC")}>
              Certificate of Completion
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => canvas && insertImage(canvas, "folderD")}>
              Certificate of Recognition
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => canvas && insertImage(canvas, "folderE")}>
              Certificate of Appreciation
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
      </ScrollArea>
    </Panel>
  );
};

const Settings = () => {
  const hasActiveObject = useCanvasStore((s) => !!s.objects);
  return hasActiveObject ? <ObjectProperties /> : <PageProperties />;
};

export { Properties };

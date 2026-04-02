import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/usePortfolioAuth";
import { usePortfolioItems } from "@/hooks/usePortfolio";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, GripVertical, FileText, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortfolioManager() {
  const navigate = useNavigate();
  const { role } = useUser();
  const { data: portfolioItems, isLoading, updateOrder, deleteItem } = usePortfolioItems();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(portfolioItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateOrder(items.map((item, index) => ({
      id: item.id,
      order_index: index,
    })));
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-16 border border-black/[0.05] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C94A2C] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40">Fetching Exhibition Registry...</p>
      </div>
    );
  }

  if (!portfolioItems || portfolioItems.length === 0) {
    return (
      <Card className="bg-white border-black/[0.05] p-16 rounded-2xl shadow-sm text-center">
          <div className="max-w-xs mx-auto space-y-6">
            <div className="mx-auto w-12 h-12 bg-[#F5F0E8] border border-black/5 rounded-xl flex items-center justify-center shadow-inner">
              <FileText size={20} className="text-[#C94A2C]/40" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-display font-black tracking-tighter uppercase">Registry Empty</h3>
                <p className="text-[10px] text-[#0D0D0D]/40 font-bold tracking-widest uppercase leading-relaxed">
                    No clinical entries detected in the primary exhibition database. 
                </p>
            </div>
            <Button 
                onClick={() => navigate("/management/portfolio/new")}
                className="bg-[#0D0D0D] hover:bg-[#C94A2C] text-white px-8 h-12 rounded-full text-[9px] font-black uppercase tracking-widest transition-all"
            >
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Initiate Protocol
            </Button>
          </div>
      </Card>
    );
  }

  return (
    <div className="bg-white border border-black/[0.05] rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5">
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={() => setIsDragging(true)}>
          <Droppable droppableId="portfolio-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F0E8]/50 border-b border-black/5 h-14">
                      {role?.is_admin && <TableHead className="w-16"></TableHead>}
                      <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 whitespace-nowrap">Title</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 whitespace-nowrap">Category</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 whitespace-nowrap">Status</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 whitespace-nowrap">Authenticated</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-[#0D0D0D]/60 w-24 text-right pr-6">Management</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.map((item, index) => (
                      <Draggable 
                        key={item.id} 
                        draggableId={item.id} 
                        index={index}
                        isDragDisabled={!role?.is_admin}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                                "h-16 transition-all duration-300 border-b border-black/5",
                                snapshot.isDragging ? "bg-[#F5F0E8] shadow-lg z-[100] scale-[1.01] rounded-[2rem]" : "bg-white hover:bg-[#F5F0E8]/40"
                            )}
                          >
                            {role?.is_admin && (
                              <TableCell className="pl-6">
                                <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors">
                                  <GripVertical size={16} className="text-black/10 group-hover:text-black/40" />
                                </div>
                              </TableCell>
                            )}
                            <TableCell className="font-display font-black tracking-tighter text-base text-[#0D0D0D]">
                                {item.title}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-black/5 bg-[#F5F0E8] text-[#0D0D0D]/40">
                                {item.category}
                              </span>
                            </TableCell>
                            <TableCell>
                              {item.is_published ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-[#C94A2C]/10 bg-[#C94A2C]/5 text-[#C94A2C]">
                                  <CheckCircle2 size={8} />
                                  Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-black/10 bg-black/[0.05] text-black/60">
                                  <Clock size={8} />
                                  Staging
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-[10px] font-bold text-black/40 tracking-tight whitespace-nowrap uppercase">
                               {new Date(item.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  onClick={() => navigate(`/management/portfolio/${item.id}`)}
                                  className="h-8 w-8 p-0 rounded-lg hover:bg-black/5 transition-colors"
                                >
                                  <Edit2 size={14} className="text-[#0D0D0D]/60" />
                                </Button>
                                {role?.is_admin && (
                                  <Button
                                    variant="ghost"
                                    onClick={() => deleteItem(item.id)}
                                    className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 size={14} className="text-[#C94A2C]" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}
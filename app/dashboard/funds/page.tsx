"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-context";
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconDotsVertical,
  IconCoins,
  IconUser,
  IconCalendar,
  IconInfoCircle
} from "@tabler/icons-react";

// Define types for our fund data
interface FundData {
  id: number;
  fund_type: string;
  total_amount: number;
  amount_for_club: number;
  date_time: string;
  given_by: string;
  done_by: string | null;
  added_by: string;
}

export default function FundsPage() {
  const [funds, setFunds] = useState<FundData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fundDialogOpen, setFundDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFund, setCurrentFund] = useState<FundData | null>(null);
  const { setSuccessMsg, setErrorMsg, setInfoMsg } = useToast();

  // Form state
  const [fundForm, setFundForm] = useState({
    id: 0,
    userName: "",
    amount: 0,
    date: ""
  });

  // Fetch funds
  const fetchFunds = async () => {
    try {
      // In a real implementation, you would fetch a list of funds
      // For now, we're using mock data for illustration
      setLoading(true);
      
      // Mock data for display
      const mockFunds: FundData[] = [
        {
          id: 1,
          fund_type: "DIRECT",
          total_amount: 1000,
          amount_for_club: 1000,
          date_time: "15/04/2023",
          given_by: "john_doe",
          done_by: null,
          added_by: "admin"
        },
        {
          id: 2,
          fund_type: "DIRECT",
          total_amount: 2500,
          amount_for_club: 2500,
          date_time: "22/05/2023",
          given_by: "jane_smith",
          done_by: null,
          added_by: "admin"
        },
        {
          id: 3,
          fund_type: "DIRECT",
          total_amount: 1500,
          amount_for_club: 1500,
          date_time: "10/06/2023",
          given_by: "alex_jones",
          done_by: null,
          added_by: "admin"
        }
      ];
      
      setFunds(mockFunds);
      setLoading(false);
    } catch (error) {
      setErrorMsg("Failed to fetch funds. Please try again.");
      setLoading(false);
    }
  };

  // Load funds on component mount
  useEffect(() => {
    fetchFunds();
  }, []);

  // Reset form
  const resetForm = () => {
    setFundForm({
      id: 0,
      userName: "",
      amount: 0,
      date: ""
    });
  };

  // View fund details
  const viewFund = async (id: number) => {
    try {
      // API call to get fund details
      const response = await fetch(`/api/v1/read_fund?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentFund(data.data);
        setViewDialogOpen(true);
      } else {
        setErrorMsg(data.message || "Failed to fetch fund details");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while fetching fund details.");
    }
  };

  // Edit fund
  const editFund = async (id: number) => {
    try {
      // Fetch the fund details first
      const response = await fetch(`/api/v1/read_fund?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        const fundData = data.data;
        
        // Set form state
        setFundForm({
          id: fundData.id,
          userName: fundData.given_by,
          amount: fundData.total_amount,
          date: fundData.date_time
        });
        
        // Set editing mode
        setIsEditing(true);
        setFundDialogOpen(true);
      } else {
        setErrorMsg(data.message || "Failed to fetch fund for editing");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while preparing for edit.");
    }
  };

  // Save fund
  const saveFund = async () => {
    try {
      // Validation
      if (!fundForm.userName || fundForm.amount <= 0 || !fundForm.date) {
        setErrorMsg("Please fill in all required fields correctly.");
        return;
      }

      // Prepare request data
      const fundData = {
        user_name: fundForm.userName,
        amount: fundForm.amount,
        date: fundForm.date
      };

      // If editing, add the ID
      if (isEditing) {
        Object.assign(fundData, { id: fundForm.id });
      }
      
      // Determine endpoint based on if we're editing
      const endpoint = isEditing ? '/api/v1/update_fund' : '/api/v1/save_fund';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fundData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMsg(isEditing ? "Fund updated successfully" : "Fund created successfully");
        setFundDialogOpen(false);
        fetchFunds(); // Refresh the funds list
        resetForm();
        setIsEditing(false);
      } else {
        setErrorMsg(data.message || "Failed to save fund");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  // Delete fund
  const deleteFund = async (id: number) => {
    try {
      // API call to delete fund
      const response = await fetch(`/api/v1/delete_fund?id=${id}`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMsg("Fund deleted successfully");
        fetchFunds(); // Refresh funds list
      } else {
        setErrorMsg(data.message || "Failed to delete fund");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred while deleting the fund.");
    }
  };

  // Format amount as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funds</h1>
          <p className="text-muted-foreground">Manage club funds and contributions</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsEditing(false);
          setFundDialogOpen(true);
        }} className="gap-2">
          <IconPlus className="h-4 w-4" />
          Add Fund
        </Button>
      </div>
      
      <Separator />
      
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>All Funds</CardTitle>
          <CardDescription>Browse and manage all funds received by the club</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : funds.length === 0 ? (
            <div className="py-12 text-center">
              <IconCoins className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">No funds found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get started by adding your first fund entry.
              </p>
              <Button onClick={() => {
                resetForm();
                setIsEditing(false);
                setFundDialogOpen(true);
              }} className="mt-6">Add Fund</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funds.map((fund) => (
                    <TableRow key={fund.id}>
                      <TableCell>{fund.id}</TableCell>
                      <TableCell className="font-medium">{fund.given_by}</TableCell>
                      <TableCell>{formatCurrency(fund.total_amount)}</TableCell>
                      <TableCell>{fund.date_time}</TableCell>
                      <TableCell>{fund.fund_type}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <IconDotsVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewFund(fund.id)}>
                              <IconInfoCircle className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editFund(fund.id)}>
                              <IconEdit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete fund #${fund.id}?`)) {
                                  deleteFund(fund.id);
                                }
                              }}
                              className="text-red-600"
                            >
                              <IconTrash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Create/Edit Fund Dialog */}
      <Dialog open={fundDialogOpen} onOpenChange={setFundDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Fund" : "Add New Fund"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the fund details." 
                : "Add details about the fund. All fields are required."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="id">Fund ID</Label>
                <Input 
                  id="id"
                  value={fundForm.id}
                  disabled
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="userName">
                Contributor Username *
              </Label>
              <div className="relative">
                <IconUser className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="userName"
                  value={fundForm.userName}
                  onChange={(e) => setFundForm({...fundForm, userName: e.target.value})}
                  placeholder="e.g., john_doe"
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount *
              </Label>
              <div className="relative">
                <IconCoins className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="amount"
                  type="number"
                  value={fundForm.amount === 0 ? "" : fundForm.amount}
                  onChange={(e) => setFundForm({...fundForm, amount: parseInt(e.target.value) || 0})}
                  placeholder="e.g., 1000"
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">
                Date *
              </Label>
              <div className="relative">
                <IconCalendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="date"
                  value={fundForm.date}
                  onChange={(e) => setFundForm({...fundForm, date: e.target.value})}
                  placeholder="dd/MM/yyyy"
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">Format: dd/MM/yyyy</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setFundDialogOpen(false);
              resetForm();
              setIsEditing(false);
            }}>
              Cancel
            </Button>
            <Button onClick={saveFund}>
              {isEditing ? "Update Fund" : "Add Fund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Fund Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Fund Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the fund
            </DialogDescription>
          </DialogHeader>
          {currentFund && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Fund ID</div>
                  <div>{currentFund.id}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Type</div>
                  <div>{currentFund.fund_type}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Total Amount</div>
                  <div className="text-lg font-semibold">{formatCurrency(currentFund.total_amount)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Club Amount</div>
                  <div>{formatCurrency(currentFund.amount_for_club)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Date</div>
                  <div>{currentFund.date_time}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Contributor</div>
                  <div>{currentFund.given_by}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Added By</div>
                  <div>{currentFund.added_by}</div>
                </div>
                {currentFund.done_by && (
                  <div>
                    <div className="text-sm font-medium">Done By</div>
                    <div>{currentFund.done_by}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {currentFund && (
              <Button onClick={() => {
                setViewDialogOpen(false);
                editFund(currentFund.id);
              }}>
                Edit Fund
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
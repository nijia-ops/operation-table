"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface EmployeeData {
  entity: string
  position: string
  department: string
  service1: string
  service2: string
  id: string
  [key: string]: string | number
}

const generateInitialData = (): EmployeeData[] => {
  const baseData = [
    // TODAY Service - Permanent
    {
      entity: "LTL",
      position: "Permanent",
      department: "Customer Care",
      service1: "TODAY",
      service2: "",
      id: "p-today-1",
      "2024/4": 1.0,
      "2024/5": 1.0,
      "2024/6": 1.0,
      "2024/7": 1.1,
      "2024/8": 0.9,
      "2024/9": 1.2,
      "2024/10": 1.0,
      "2024/11": 1.1,
      "2024/12": 1.0,
    },
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      service1: "TODAY",
      service2: "",
      id: "p-today-2",
      "2024/4": 1.0,
      "2024/5": 1.0,
      "2024/6": 1.0,
      "2024/7": 1.0,
      "2024/8": 1.1,
      "2024/9": 0.9,
      "2024/10": 1.0,
      "2024/11": 1.0,
      "2024/12": 1.1,
    },
    {
      entity: "LTL",
      position: "Permanent",
      department: "Game",
      service1: "TODAY",
      service2: "",
      id: "p-today-3",
      "2024/4": 1.0,
      "2024/5": 0.5,
      "2024/6": 1.0,
      "2024/7": 0.8,
      "2024/8": 1.2,
      "2024/9": 1.0,
      "2024/10": 0.9,
      "2024/11": 1.1,
      "2024/12": 1.0,
    },
    // TODAY Service - Dispatch
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      service1: "TODAY",
      service2: "",
      id: "d-today-1",
      "2024/4": 0.5,
      "2024/5": 0.5,
      "2024/6": 0.5,
      "2024/7": 0.6,
      "2024/8": 0.4,
      "2024/9": 0.5,
      "2024/10": 0.5,
      "2024/11": 0.6,
      "2024/12": 0.5,
    },
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Game",
      service1: "TODAY",
      service2: "",
      id: "d-today-2",
      "2024/4": 0.0,
      "2024/5": 0.0,
      "2024/6": 0.0,
      "2024/7": 0.1,
      "2024/8": 0.0,
      "2024/9": 0.0,
      "2024/10": 0.0,
      "2024/11": 0.1,
      "2024/12": 0.0,
    },
    // AA Service - Permanent
    {
      entity: "LTL",
      position: "Permanent",
      department: "Marketing",
      service1: "AA",
      service2: "",
      id: "p-aa-1",
      "2024/4": 0.8,
      "2024/5": 0.9,
      "2024/6": 1.0,
      "2024/7": 0.9,
      "2024/8": 1.1,
      "2024/9": 1.0,
      "2024/10": 0.8,
      "2024/11": 0.9,
      "2024/12": 1.0,
    },
    {
      entity: "LTL",
      position: "Permanent",
      department: "Sales",
      service1: "AA",
      service2: "",
      id: "p-aa-2",
      "2024/4": 1.2,
      "2024/5": 1.1,
      "2024/6": 0.9,
      "2024/7": 1.0,
      "2024/8": 1.2,
      "2024/9": 1.1,
      "2024/10": 1.0,
      "2024/11": 1.1,
      "2024/12": 1.2,
    },
    // AA Service - Dispatch
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Marketing",
      service1: "AA",
      service2: "",
      id: "d-aa-1",
      "2024/4": 0.3,
      "2024/5": 0.4,
      "2024/6": 0.2,
      "2024/7": 0.3,
      "2024/8": 0.4,
      "2024/9": 0.3,
      "2024/10": 0.2,
      "2024/11": 0.3,
      "2024/12": 0.4,
    },
    // LINE Main Service - Permanent
    {
      entity: "LTL",
      position: "Permanent",
      department: "Support",
      service1: "LINE Main",
      service2: "",
      id: "p-line-1",
      "2024/4": 1.5,
      "2024/5": 1.3,
      "2024/6": 1.4,
      "2024/7": 1.4,
      "2024/8": 1.5,
      "2024/9": 1.3,
      "2024/10": 1.4,
      "2024/11": 1.5,
      "2024/12": 1.4,
    },
    {
      entity: "LTL",
      position: "Permanent",
      department: "Operations",
      service1: "LINE Main",
      service2: "",
      id: "p-line-2",
      "2024/4": 0.9,
      "2024/5": 1.0,
      "2024/6": 1.1,
      "2024/7": 1.0,
      "2024/8": 0.9,
      "2024/9": 1.1,
      "2024/10": 1.0,
      "2024/11": 0.9,
      "2024/12": 1.0,
    },
    // LINE Main Service - Dispatch
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Support",
      service1: "LINE Main",
      service2: "",
      id: "d-line-1",
      "2024/4": 0.6,
      "2024/5": 0.7,
      "2024/6": 0.5,
      "2024/7": 0.6,
      "2024/8": 0.7,
      "2024/9": 0.6,
      "2024/10": 0.5,
      "2024/11": 0.6,
      "2024/12": 0.7,
    },
    // Others Service - Permanent
    {
      entity: "LTL",
      position: "Permanent",
      department: "Research",
      service1: "Others",
      service2: "",
      id: "p-others-1",
      "2024/4": 0.7,
      "2024/5": 0.8,
      "2024/6": 0.6,
      "2024/7": 0.7,
      "2024/8": 0.8,
      "2024/9": 0.7,
      "2024/10": 0.6,
      "2024/11": 0.7,
      "2024/12": 0.8,
    },
  ]

  return baseData
}

const monthColumns = [
  "2024/4",
  "2024/5",
  "2024/6",
  "2024/7",
  "2024/8",
  "2024/9",
  "2024/10",
  "2024/11",
  "2024/12",
] as const

export default function HierarchicalTable() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["Permanent", "Dispatch"]))
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(["TODAY"]))
  const [isEditMode, setIsEditMode] = useState(false)
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>(generateInitialData())

  // First group by position, then by service
  const groupedByPosition = employeeData.reduce(
    (acc, item) => {
      const positionKey = item.position
      const serviceKey = item.service1

      if (!acc[positionKey]) {
        acc[positionKey] = {}
      }
      if (!acc[positionKey][serviceKey]) {
        acc[positionKey][serviceKey] = []
      }
      acc[positionKey][serviceKey].push(item)
      return acc
    },
    {} as Record<string, Record<string, EmployeeData[]>>,
  )

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName)
    } else {
      newExpanded.add(groupName)
    }
    setExpandedGroups(newExpanded)
  }

  const toggleService = (serviceName: string) => {
    const newExpanded = new Set(expandedServices)
    if (newExpanded.has(serviceName)) {
      newExpanded.delete(serviceName)
    } else {
      newExpanded.add(serviceName)
    }
    setExpandedServices(newExpanded)
  }

  const handleValueChange = (id: string, month: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return

    setEmployeeData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, [month]: numValue }
        }
        return item
      }),
    )
  }

  const calculateGroupTotals = (group: EmployeeData[]) => {
    const totals: any = { count: group.length }
    monthColumns.forEach((month) => {
      totals[month] = group.reduce((sum, item) => sum + Number(item[month]), 0)
    })
    return totals
  }

  const calculatePositionTotals = (positionType: string) => {
    const positionData = employeeData.filter((item) => item.position === positionType)
    const totals: any = { count: positionData.length }
    monthColumns.forEach((month) => {
      totals[month] = positionData.reduce((sum, item) => sum + Number(item[month]), 0)
    })
    return totals
  }

  const calculateOverallTotals = () => {
    const totals: any = { count: employeeData.length }
    monthColumns.forEach((month) => {
      totals[month] = employeeData.reduce((sum, item) => sum + Number(item[month]), 0)
    })
    return totals
  }

  const overallTotals = calculateOverallTotals()
  const permanentTotals = calculatePositionTotals("Permanent")
  const dispatchTotals = calculatePositionTotals("Dispatch")

  // Create flat array of rows to render
  const renderRows = () => {
    const rows = []

    // We want to ensure Permanent is always first, then Dispatch
    const positionOrder = ["Permanent", "Dispatch"]

    positionOrder.forEach((positionName) => {
      if (!groupedByPosition[positionName]) return

      const services = groupedByPosition[positionName]
      const isPositionExpanded = expandedGroups.has(positionName)

      // Service Rows (no position header row)
      if (isPositionExpanded) {
        Object.entries(services).forEach(([serviceName, items]) => {
          const isServiceExpanded = expandedServices.has(serviceName)
          const serviceTotals = calculateGroupTotals(items)

          rows.push(
            <TableRow
              key={`service-${positionName}-${serviceName}`}
              className="border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              <TableCell className="p-2 sticky left-0 bg-gray-100 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleService(serviceName)}
                  className="h-6 w-6 p-0 text-black hover:bg-gray-300"
                >
                  {isServiceExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </TableCell>
              <TableCell className="font-medium text-black sticky left-8 bg-gray-100 z-10 min-w-[120px]">
                {serviceName} ({items.length})
              </TableCell>
              <TableCell className="text-black sticky left-[152px] bg-gray-100 z-10 min-w-[100px]"></TableCell>
              <TableCell className="text-black sticky left-[252px] bg-gray-100 z-10 min-w-[120px]"></TableCell>
              {monthColumns.map((month) => (
                <TableCell key={month} className="text-right text-black font-medium min-w-[80px]">
                  {serviceTotals[month].toFixed(2)}
                </TableCell>
              ))}
            </TableRow>,
          )

          if (isServiceExpanded) {
            items.forEach((item) => {
              rows.push(
                <TableRow key={item.id} className="border-gray-300 hover:bg-gray-50">
                  <TableCell className="p-2 pl-8 sticky left-0 bg-white z-10"></TableCell>
                  <TableCell className="text-black pl-12 sticky left-8 bg-white z-10 min-w-[120px]">
                    {item.entity}
                  </TableCell>
                  <TableCell className="text-black sticky left-[152px] bg-white z-10 min-w-[100px]">
                    {positionName}
                  </TableCell>
                  <TableCell className="text-black sticky left-[252px] bg-white z-10 min-w-[120px]">
                    {item.department}
                  </TableCell>
                  {monthColumns.map((month) => (
                    <TableCell key={`${item.id}-${month}`} className="text-right text-black min-w-[80px]">
                      {isEditMode ? (
                        <Input
                          type="number"
                          value={item[month].toString()}
                          onChange={(e) => handleValueChange(item.id, month, e.target.value)}
                          className="w-20 h-8 text-right p-1 mx-auto"
                          step="0.1"
                          min="0"
                        />
                      ) : (
                        Number(item[month]).toFixed(2)
                      )}
                    </TableCell>
                  ))}
                </TableRow>,
              )
            })
          }
        })

        // Add position total after each position group
        const positionTotals = positionName === "Permanent" ? permanentTotals : dispatchTotals
        rows.push(
          <TableRow key={`total-${positionName}`} className="border-gray-300 bg-yellow-300 hover:bg-yellow-400">
            <TableCell className="p-2 sticky left-0 bg-yellow-300 z-10"></TableCell>
            <TableCell className="font-bold text-black sticky left-8 bg-yellow-300 z-10 min-w-[120px]">
              {positionName} Total ({positionTotals.count})
            </TableCell>
            <TableCell className="text-black sticky left-[152px] bg-yellow-300 z-10 min-w-[100px]"></TableCell>
            <TableCell className="text-black sticky left-[252px] bg-yellow-300 z-10 min-w-[120px]"></TableCell>
            {monthColumns.map((month) => (
              <TableCell key={month} className="text-right font-bold text-black min-w-[80px]">
                {positionTotals[month].toFixed(2)}
              </TableCell>
            ))}
          </TableRow>,
        )
      }
    })

    return rows
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white text-black rounded-lg border border-gray-300">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-black">Employee Performance Data</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
            <Label htmlFor="edit-mode" className="flex items-center gap-1">
              {isEditMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {isEditMode ? "Save Mode" : "Edit Mode"}
            </Label>
          </div>
          <div className="text-sm text-black text-right">
            <div>
              Permanent: {permanentTotals.count} ({permanentTotals["2024/4"].toFixed(1)})
            </div>
            <div>
              Dispatch: {dispatchTotals.count} ({dispatchTotals["2024/4"].toFixed(1)})
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-gray-300 bg-gray-50 hover:bg-gray-100">
              <TableHead className="text-black font-medium w-8 sticky left-0 bg-gray-50 z-20"></TableHead>
              <TableHead className="text-black font-medium sticky left-8 bg-gray-50 z-20 min-w-[120px]">
                Service Group
              </TableHead>
              <TableHead className="text-black font-medium sticky left-[152px] bg-gray-50 z-20 min-w-[100px]">
                Position
              </TableHead>
              <TableHead className="text-black font-medium sticky left-[252px] bg-gray-50 z-20 min-w-[120px]">
                Department
              </TableHead>
              {monthColumns.map((month) => (
                <TableHead key={month} className="text-black font-medium text-right min-w-[80px]">
                  {month}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </div>
    </div>
  )
}

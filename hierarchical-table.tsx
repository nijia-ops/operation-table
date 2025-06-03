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
  subDepartment: string
  service1: string
  service2: string
  id: string
  [key: string]: string | number
}

const generateInitialData = (): EmployeeData[] => {
  const baseData = [
    // LTL - Permanent - Engineering - Alpha Dev - TODAY Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "TODAY",
      service2: "",
      id: "ltl-p-eng-alpha-today-1",
      "2024/4": 1.2,
      "2024/5": 1.1,
      "2024/6": 1.3,
      "2024/7": 1.0,
      "2024/8": 1.4,
      "2024/9": 1.2,
      "2024/10": 1.1,
      "2024/11": 1.3,
      "2024/12": 1.2,
    },
    // LTL - Permanent - Engineering - Alpha Dev - AA Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "AA",
      service2: "",
      id: "ltl-p-eng-alpha-aa-1",
      "2024/4": 1.0,
      "2024/5": 0.9,
      "2024/6": 1.1,
      "2024/7": 1.0,
      "2024/8": 0.8,
      "2024/9": 1.2,
      "2024/10": 1.0,
      "2024/11": 0.9,
      "2024/12": 1.1,
    },
    // LTL - Permanent - Engineering - Alpha Dev - LINE Main Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "LINE Main",
      service2: "",
      id: "ltl-p-eng-alpha-line-1",
      "2024/4": 1.3,
      "2024/5": 1.4,
      "2024/6": 1.2,
      "2024/7": 1.5,
      "2024/8": 1.3,
      "2024/9": 1.4,
      "2024/10": 1.2,
      "2024/11": 1.5,
      "2024/12": 1.3,
    },
    // LTL - Permanent - Engineering - Alpha Dev - Others Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "Others",
      service2: "",
      id: "ltl-p-eng-alpha-others-1",
      "2024/4": 0.8,
      "2024/5": 0.7,
      "2024/6": 0.9,
      "2024/7": 0.8,
      "2024/8": 0.6,
      "2024/9": 1.0,
      "2024/10": 0.8,
      "2024/11": 0.7,
      "2024/12": 0.9,
    },
    // LTL - Permanent - Engineering - SRE - TODAY Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "TODAY",
      service2: "",
      id: "ltl-p-eng-sre-today-1",
      "2024/4": 0.9,
      "2024/5": 1.0,
      "2024/6": 0.8,
      "2024/7": 1.1,
      "2024/8": 0.9,
      "2024/9": 1.0,
      "2024/10": 1.2,
      "2024/11": 0.8,
      "2024/12": 1.1,
    },
    // LTL - Permanent - Engineering - SRE - AA Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "AA",
      service2: "",
      id: "ltl-p-eng-sre-aa-1",
      "2024/4": 1.1,
      "2024/5": 1.0,
      "2024/6": 1.2,
      "2024/7": 0.9,
      "2024/8": 1.3,
      "2024/9": 1.1,
      "2024/10": 1.0,
      "2024/11": 1.2,
      "2024/12": 1.1,
    },
    // LTL - Permanent - Engineering - SRE - LINE Main Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "LINE Main",
      service2: "",
      id: "ltl-p-eng-sre-line-1",
      "2024/4": 1.4,
      "2024/5": 1.2,
      "2024/6": 1.5,
      "2024/7": 1.3,
      "2024/8": 1.4,
      "2024/9": 1.2,
      "2024/10": 1.5,
      "2024/11": 1.3,
      "2024/12": 1.4,
    },
    // LTL - Permanent - Engineering - SRE - Others Service
    {
      entity: "LTL",
      position: "Permanent",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "Others",
      service2: "",
      id: "ltl-p-eng-sre-others-1",
      "2024/4": 0.6,
      "2024/5": 0.7,
      "2024/6": 0.5,
      "2024/7": 0.8,
      "2024/8": 0.6,
      "2024/9": 0.7,
      "2024/10": 0.5,
      "2024/11": 0.8,
      "2024/12": 0.6,
    },
    // LTL - Dispatch - Engineering - Alpha Dev - TODAY Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "TODAY",
      service2: "",
      id: "ltl-d-eng-alpha-today-1",
      "2024/4": 0.4,
      "2024/5": 0.3,
      "2024/6": 0.5,
      "2024/7": 0.4,
      "2024/8": 0.3,
      "2024/9": 0.4,
      "2024/10": 0.5,
      "2024/11": 0.3,
      "2024/12": 0.4,
    },
    // LTL - Dispatch - Engineering - Alpha Dev - AA Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "AA",
      service2: "",
      id: "ltl-d-eng-alpha-aa-1",
      "2024/4": 0.2,
      "2024/5": 0.3,
      "2024/6": 0.1,
      "2024/7": 0.2,
      "2024/8": 0.4,
      "2024/9": 0.2,
      "2024/10": 0.3,
      "2024/11": 0.1,
      "2024/12": 0.2,
    },
    // LTL - Dispatch - Engineering - Alpha Dev - LINE Main Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "LINE Main",
      service2: "",
      id: "ltl-d-eng-alpha-line-1",
      "2024/4": 0.5,
      "2024/5": 0.6,
      "2024/6": 0.4,
      "2024/7": 0.7,
      "2024/8": 0.5,
      "2024/9": 0.6,
      "2024/10": 0.4,
      "2024/11": 0.7,
      "2024/12": 0.5,
    },
    // LTL - Dispatch - Engineering - Alpha Dev - Others Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "Alpha Dev",
      service1: "Others",
      service2: "",
      id: "ltl-d-eng-alpha-others-1",
      "2024/4": 0.3,
      "2024/5": 0.2,
      "2024/6": 0.4,
      "2024/7": 0.3,
      "2024/8": 0.2,
      "2024/9": 0.3,
      "2024/10": 0.4,
      "2024/11": 0.2,
      "2024/12": 0.3,
    },
    // LTL - Dispatch - Engineering - SRE - TODAY Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "TODAY",
      service2: "",
      id: "ltl-d-eng-sre-today-1",
      "2024/4": 0.3,
      "2024/5": 0.4,
      "2024/6": 0.2,
      "2024/7": 0.5,
      "2024/8": 0.3,
      "2024/9": 0.4,
      "2024/10": 0.2,
      "2024/11": 0.5,
      "2024/12": 0.3,
    },
    // LTL - Dispatch - Engineering - SRE - AA Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "AA",
      service2: "",
      id: "ltl-d-eng-sre-aa-1",
      "2024/4": 0.4,
      "2024/5": 0.3,
      "2024/6": 0.5,
      "2024/7": 0.2,
      "2024/8": 0.6,
      "2024/9": 0.4,
      "2024/10": 0.3,
      "2024/11": 0.5,
      "2024/12": 0.4,
    },
    // LTL - Dispatch - Engineering - SRE - LINE Main Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "LINE Main",
      service2: "",
      id: "ltl-d-eng-sre-line-1",
      "2024/4": 0.7,
      "2024/5": 0.6,
      "2024/6": 0.8,
      "2024/7": 0.5,
      "2024/8": 0.9,
      "2024/9": 0.7,
      "2024/10": 0.6,
      "2024/11": 0.8,
      "2024/12": 0.7,
    },
    // LTL - Dispatch - Engineering - SRE - Others Service
    {
      entity: "LTL",
      position: "Dispatch",
      department: "Engineering",
      subDepartment: "SRE",
      service1: "Others",
      service2: "",
      id: "ltl-d-eng-sre-others-1",
      "2024/4": 0.2,
      "2024/5": 0.3,
      "2024/6": 0.1,
      "2024/7": 0.4,
      "2024/8": 0.2,
      "2024/9": 0.3,
      "2024/10": 0.1,
      "2024/11": 0.4,
      "2024/12": 0.2,
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

// Store original values for comparison
const originalData = generateInitialData()

export default function HierarchicalTable() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(
    new Set([
      "TODAY-Permanent",
      "AA-Permanent",
      "LINE Main-Permanent",
      "Others-Permanent",
      "TODAY-Dispatch",
      "AA-Dispatch",
      "LINE Main-Dispatch",
      "Others-Dispatch",
    ]),
  )
  const [isEditMode, setIsEditMode] = useState(false)
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>(generateInitialData())

  // Group by position first, then by service, then by entity, department, subDepartment
  const groupedData = employeeData.reduce(
    (acc, item) => {
      const positionKey = item.position
      const serviceKey = item.service1
      const entityKey = item.entity
      const departmentKey = item.department
      const subDepartmentKey = item.subDepartment

      if (!acc[positionKey]) acc[positionKey] = {}
      if (!acc[positionKey][serviceKey]) acc[positionKey][serviceKey] = {}
      if (!acc[positionKey][serviceKey][entityKey]) acc[positionKey][serviceKey][entityKey] = {}
      if (!acc[positionKey][serviceKey][entityKey][departmentKey])
        acc[positionKey][serviceKey][entityKey][departmentKey] = {}
      if (!acc[positionKey][serviceKey][entityKey][departmentKey][subDepartmentKey])
        acc[positionKey][serviceKey][entityKey][departmentKey][subDepartmentKey] = []

      acc[positionKey][serviceKey][entityKey][departmentKey][subDepartmentKey].push(item)
      return acc
    },
    {} as Record<string, Record<string, Record<string, Record<string, Record<string, EmployeeData[]>>>>>,
  )

  const toggleService = (serviceKey: string) => {
    const newExpanded = new Set(expandedServices)
    if (newExpanded.has(serviceKey)) {
      newExpanded.delete(serviceKey)
    } else {
      newExpanded.add(serviceKey)
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

  const calculatePositionTotals = (positionType: string) => {
    const positionData = employeeData.filter((item) => item.position === positionType)
    const totals: any = { count: positionData.length }
    monthColumns.forEach((month) => {
      totals[month] = positionData.reduce((sum, item) => sum + Number(item[month]), 0)
    })
    return totals
  }

  const calculateOriginalPositionTotals = (positionType: string) => {
    const positionData = originalData.filter((item) => item.position === positionType)
    const totals: any = { count: positionData.length }
    monthColumns.forEach((month) => {
      totals[month] = positionData.reduce((sum, item) => sum + Number(item[month]), 0)
    })
    return totals
  }

  const permanentTotals = calculatePositionTotals("Permanent")
  const dispatchTotals = calculatePositionTotals("Dispatch")

  // Calculate original totals for comparison
  const originalPermanentTotals = calculateOriginalPositionTotals("Permanent")
  const originalDispatchTotals = calculateOriginalPositionTotals("Dispatch")

  // Function to get color class based on comparison
  const getColorClass = (current: number, original: number) => {
    if (current > original) return "text-blue-600"
    if (current < original) return "text-red-600"
    return "text-black"
  }

  // Helper function to render items for a specific position and service
  const renderServiceItems = (positionType: string, serviceName: string, serviceData: any) => {
    const rows = []

    Object.entries(serviceData).forEach(([entityName, entityData]) => {
      Object.entries(entityData).forEach(([departmentName, departmentData]) => {
        Object.entries(departmentData).forEach(([subDepartmentName, items]) => {
          items.forEach((item: EmployeeData) => {
            rows.push(
              <TableRow key={`item-${item.id}`} className="border-gray-300 bg-green-100 hover:bg-green-200">
                <TableCell className="p-2 sticky left-0 bg-green-100 z-10"></TableCell>
                <TableCell className="font-medium text-black sticky left-8 bg-green-100 z-10 min-w-[120px] pl-8">
                  {serviceName}
                </TableCell>
                <TableCell className="text-black sticky left-[152px] bg-green-100 z-10 min-w-[100px]">
                  {positionType}
                </TableCell>
                <TableCell className="text-black sticky left-[252px] bg-green-100 z-10 min-w-[120px]">
                  {subDepartmentName}
                </TableCell>
                <TableCell className="text-black sticky left-[372px] bg-green-100 z-10 min-w-[120px]">
                  {entityName}
                </TableCell>
                {monthColumns.map((month) => (
                  <TableCell key={month} className="text-right text-black font-medium min-w-[80px]">
                    {isEditMode ? (
                      <Input
                        type="number"
                        value={Number(item[month]).toFixed(2)}
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
        })
      })
    })

    return rows
  }

  // Create flat array of rows to render
  const renderRows = () => {
    const rows = []

    // Position order
    const positionOrder = ["Permanent", "Dispatch"]
    // Service order
    const serviceOrder = ["TODAY", "AA", "LINE Main", "Others"]

    positionOrder.forEach((positionType) => {
      if (!groupedData[positionType]) return

      const positionData = groupedData[positionType]

      serviceOrder.forEach((serviceName) => {
        if (!positionData[serviceName]) return

        const serviceData = positionData[serviceName]
        const serviceKey = `${serviceName}-${positionType}`
        const isServiceExpanded = expandedServices.has(serviceKey)

        // Calculate service totals for this position
        const serviceTotals: any = { count: 0 }
        monthColumns.forEach((month) => {
          serviceTotals[month] = 0
        })

        Object.values(serviceData).forEach((entityData) => {
          Object.values(entityData).forEach((departmentData) => {
            Object.values(departmentData).forEach((items) => {
              serviceTotals.count += items.length
              monthColumns.forEach((month) => {
                serviceTotals[month] += items.reduce((sum, item) => sum + Number(item[month]), 0)
              })
            })
          })
        })

        // Service header row
        rows.push(
          <TableRow key={`service-${serviceKey}`} className="border-gray-300 bg-blue-100 hover:bg-blue-200">
            <TableCell className="p-2 sticky left-0 bg-blue-100 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleService(serviceKey)}
                className="h-6 w-6 p-0 text-black hover:bg-blue-300"
              >
                {isServiceExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </TableCell>
            <TableCell className="font-bold text-black sticky left-8 bg-blue-100 z-10 min-w-[120px]">
              {serviceName}
            </TableCell>
            <TableCell className="text-black sticky left-[152px] bg-blue-100 z-10 min-w-[100px]">
              {positionType}
            </TableCell>
            <TableCell className="text-black sticky left-[252px] bg-blue-100 z-10 min-w-[120px]">Engineering</TableCell>
            <TableCell className="text-black sticky left-[372px] bg-blue-100 z-10 min-w-[120px]">LTL</TableCell>
            {monthColumns.map((month) => (
              <TableCell key={month} className="text-right text-black font-bold min-w-[80px]">
                {serviceTotals[month].toFixed(2)}
              </TableCell>
            ))}
          </TableRow>,
        )

        if (isServiceExpanded) {
          const serviceRows = renderServiceItems(positionType, serviceName, serviceData)
          rows.push(...serviceRows)
        }
      })
    })

    // Add position totals at the end
    rows.push(
      <TableRow key="total-permanent" className="border-gray-300 bg-yellow-300 hover:bg-yellow-400">
        <TableCell className="p-2 sticky left-0 bg-yellow-300 z-10"></TableCell>
        <TableCell className="font-bold text-black sticky left-8 bg-yellow-300 z-10 min-w-[120px]">
          Permanent Total
        </TableCell>
        <TableCell className="text-black sticky left-[152px] bg-yellow-300 z-10 min-w-[100px]"></TableCell>
        <TableCell className="text-black sticky left-[252px] bg-yellow-300 z-10 min-w-[120px]"></TableCell>
        <TableCell className="text-black sticky left-[372px] bg-yellow-300 z-10 min-w-[120px]"></TableCell>
        {monthColumns.map((month) => (
          <TableCell key={month} className="text-right font-bold text-black min-w-[80px]">
            <span className={getColorClass(permanentTotals[month], originalPermanentTotals[month])}>
              {permanentTotals[month].toFixed(2)}
            </span>
          </TableCell>
        ))}
      </TableRow>,
    )

    rows.push(
      <TableRow key="total-dispatch" className="border-gray-300 bg-yellow-300 hover:bg-yellow-400">
        <TableCell className="p-2 sticky left-0 bg-yellow-300 z-10"></TableCell>
        <TableCell className="font-bold text-black sticky left-8 bg-yellow-300 z-10 min-w-[120px]">
          Dispatch Total
        </TableCell>
        <TableCell className="text-black sticky left-[152px] bg-yellow-300 z-10 min-w-[100px]"></TableCell>
        <TableCell className="text-black sticky left-[252px] bg-yellow-300 z-10 min-w-[120px]"></TableCell>
        <TableCell className="text-black sticky left-[372px] bg-yellow-300 z-10 min-w-[120px]"></TableCell>
        {monthColumns.map((month) => (
          <TableCell key={month} className="text-right font-bold text-black min-w-[80px]">
            <span className={getColorClass(dispatchTotals[month], originalDispatchTotals[month])}>
              {dispatchTotals[month].toFixed(2)}
            </span>
          </TableCell>
        ))}
      </TableRow>,
    )

    return rows
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white text-black rounded-lg border border-gray-300">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-black">Employee Performance Data - Service Group View</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
            <Label htmlFor="edit-mode" className="flex items-center gap-1">
              {isEditMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {isEditMode ? "Save Mode" : "Edit Mode"}
            </Label>
          </div>
          <div className="text-sm text-right">
            <div>
              Permanent: {permanentTotals.count}
              <span className={getColorClass(permanentTotals["2024/4"], originalPermanentTotals["2024/4"])}>
                ({permanentTotals["2024/4"].toFixed(1)})
              </span>
            </div>
            <div>
              Dispatch: {dispatchTotals.count}
              <span className={getColorClass(dispatchTotals["2024/4"], originalDispatchTotals["2024/4"])}>
                ({dispatchTotals["2024/4"].toFixed(1)})
              </span>
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
              <TableHead className="text-black font-medium sticky left-[372px] bg-gray-50 z-20 min-w-[120px]">
                Entity
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Camera, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function severityLabel(severity: Alert["severity"]) {
  if (severity === "human") return "Human …(truncated)
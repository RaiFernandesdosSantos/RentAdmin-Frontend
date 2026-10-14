"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  TransactionsService,
  CollectionsService,
} from "@/src/services/finance"
import { contractsService } from "@/src/services/contracts"

interface PayButtonProps {
  transactionId: number
  disabled?: boolean
}

export function PayTransactionButton({ transactionId, disabled }: PayButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    try {
      await TransactionsService.markPaid(transactionId, new Date().toISOString().slice(0, 10))
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || loading}
      onClick={handlePay}
    >
      {loading ? "Baixando..." : "Baixar"}
    </Button>
  )
}

interface ChargeButtonProps {
  transactionId: number
}

export function SendChargeEmailButton({ transactionId }: ChargeButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  async function handleSend() {
    setLoading(true)
    setFeedback(null)
    try {
      await CollectionsService.markOverdue()
      const result = await CollectionsService.sendEmail(transactionId)
      setFeedback(`E-mail enviado para ${result.to}`)
      router.refresh()
    } catch (error) {
      console.error(error)
      setFeedback("Falha ao enviar: inquilino sem e-mail cadastrado?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" disabled={loading} onClick={handleSend}>
        {loading ? "Enviando..." : "Cobrar"}
      </Button>
      {feedback && <span className="text-xs text-muted-foreground">{feedback}</span>}
    </div>
  )
}

interface CloseContractButtonProps {
  contractId: number
}

export function CloseContractButton({ contractId }: CloseContractButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClose() {
    if (!confirm("Encerrar o contrato e cancelar as cobranças em aberto?")) return
    setLoading(true)
    try {
      await contractsService.close(contractId)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" disabled={loading} onClick={handleClose}>
      {loading ? "Encerrando..." : "Encerrar"}
    </Button>
  )
}

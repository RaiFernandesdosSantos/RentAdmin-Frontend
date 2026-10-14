"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Store, Trash2, Printer } from "lucide-react"
import { TenantService } from "@/src/services/tenants"
import { PropertyService } from "@/src/services/properties"
import { BankAccountService } from "@/src/services/finance"

/* ---------------------------------------------------------------
 * Ações de entidades (excluir, vender, imprimir) — componentes de
 * cliente usados nas páginas de detalhe.
 * --------------------------------------------------------------- */

function useDeleteEntity() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function run(action: () => Promise<unknown>, redirectTo: string) {
    setLoading(true)
    try {
      await action()
      router.push(redirectTo)
    } catch (error) {
      console.error(error)
      alert("Não foi possível excluir. Verifique se não há registros vinculados.")
    } finally {
      setLoading(false)
    }
  }

  return { run, loading }
}

export function DeleteTenantButton({ tenantId }: { tenantId: number }) {
  const { run, loading } = useDeleteEntity()

  async function handleDelete() {
    const ok = confirm(
      "Excluir este inquilino? ATENÇÃO: contratos vinculados também serão excluídos. Esta ação não pode ser desfeita.",
    )
    if (!ok) return
    await run(() => TenantService.delete(tenantId), "/tenants")
  }

  return (
    <Button variant="outline" size="sm" disabled={loading} onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
      {loading ? "Excluindo..." : "Excluir"}
    </Button>
  )
}

export function DeletePropertyButton({ propertyId }: { propertyId: number }) {
  const { run, loading } = useDeleteEntity()

  async function handleDelete() {
    const ok = confirm(
      "Excluir este imóvel? ATENÇÃO: contratos vinculados também serão excluídos. Esta ação não pode ser desfeita.",
    )
    if (!ok) return
    await run(() => PropertyService.delete(propertyId), "/properties")
  }

  return (
    <Button variant="outline" size="sm" disabled={loading} onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
      {loading ? "Excluindo..." : "Excluir"}
    </Button>
  )
}

export function SellPropertyButton({ propertyId }: { propertyId: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSell() {
    const price = prompt("Preço de venda (R$):", "0.00")
    if (!price) return
    const date = prompt(
      "Data da venda (AAAA-MM-DD):",
      new Date().toISOString().slice(0, 10),
    )
    if (!date) return

    setLoading(true)
    try {
      await PropertyService.sell(propertyId, price, date)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert(
        "Não foi possível registrar a venda. Confira preço e data (ex.: 350000.00 e 2026-10-12).",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" disabled={loading} onClick={handleSell}>
      <Store className="h-4 w-4" />
      {loading ? "Registrando..." : "Registrar venda"}
    </Button>
  )
}

export function DeleteBankAccountButton({
  bankAccountId,
}: {
  bankAccountId: number
}) {
  const { run, loading } = useDeleteEntity()

  async function handleDelete() {
    const ok = confirm("Excluir esta conta bancária e seu extrato?")
    if (!ok) return
    await run(() => BankAccountService.delete(bankAccountId), "/finance")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-red-200 text-red-600"
      disabled={loading}
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
      {loading ? "Excluindo..." : "Excluir"}
    </Button>
  )
}

export function PrintButton({ label = "Exportar" }: { label?: string }) {
  return (
    <Button variant="outline" size="sm" onClick={() => window.print()}>
      <Printer className="h-4 w-4" />
      {label}
    </Button>
  )
}

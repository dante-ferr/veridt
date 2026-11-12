import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CreditPurchaseState = {
  selectedPackageId: string | null;
  selectPackage: (packageId: string) => void;
  reset: () => void;
};

export const useCreditPurchaseStore = create<CreditPurchaseState>()(
  persist(
    (set) => ({
      selectedPackageId: null,
      selectPackage: (packageId) => set({ selectedPackageId: packageId }),
      reset: () => set({ selectedPackageId: null }),
    }),
    {
      name: "veridt-credit-purchase",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

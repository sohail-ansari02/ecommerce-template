import OrderDetails from "@/app/(user)/orders/[id]/page";
import { toast } from "sonner";

export const OrderProduct = async (data: any = undefined) => {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "587eb20c-6a0d-47f4-ae13-88cdccab0881",
        name: "New Order",
        email: "miraclefittness@gmail.com",
        message: "test" + JSON.stringify(data),
      }),
    });

    const result = await response.json();

    // @ts-ignore
    if (result.success) {
      console.log("result", result);
      toast.success("Successfully Order Placed, we will contact you shortly");
    } else {
      toast.error("Order placement failed. Please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("An error occurred. Please try again.");
  }
};

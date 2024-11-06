import { toast } from "sonner";

export async function OrderProduct(data: any = undefined) {
  await fetch("https://api.web3forms.com/submit", {
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
  }).then((response) => {
    const result = response.json();
    // @ts-ignore
    if (result.success) {
      console.log('result',response);
      toast.success("Successfully Order Placed, we will contact you shortly");
    }
});
}

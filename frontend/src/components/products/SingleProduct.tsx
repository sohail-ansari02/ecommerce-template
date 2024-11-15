"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CurrencyContext, CurrencyProvider, getSelectedCountry, getSelectedCurrencySymbol } from "@/context/currency-context";
import { ProductDocument, VariantsDocument } from "@/types/types.old";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useContext, useEffect, useState } from "react";

import AddToCart from "../cart/AddToCart";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import OrderPopup from "./OrderPopup";
import { ProductImages } from "@/components/products/ProductImages";
import { Session } from "next-auth";
import { iProduct } from "@/types/types";

interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
  // const productPlainObject: ProductDocument = JSON.parse(product);
  const productPlainObject: iProduct = JSON.parse(product);
  // const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(
  const [selectedVariant, setSelectedVariant] = useState<iProduct>();
  const test = useContext(CurrencyContext)
  // const [height, setHeight] = useState();
  // const [weight, setWeight] = useState();
  const [formData, setFormData] = useState({
    height : '',
    weight : '',
    woodType : ''
  })
  const {height, weight, woodType} = formData
  useEffect(() => {
    setFormData({
      height : productPlainObject.height?.[0],
      weight : productPlainObject.weight?.[0],
      woodType : productPlainObject.woodType?.[0]
    })
  }, []);

  const formDataHandler = (name: any, value:any) => setFormData({...formData, [name] : value})

  
  useEffect(() => {
    setSelectedVariant(productPlainObject);
  }, []);

  if (!product) {
    return <div>Produnct not found</div>;
  }

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-8">
        <div className="grow-999 basis-0">
          {/* <ProductImages
          name={productPlainObject.name}
          selectedVariant={selectedVariant}
        /> */}
          <ProductImages product={productPlainObject} />
        </div>

        <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
          <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
            <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
              <h1 className="text-base font-semibold">
                {productPlainObject.name}
              </h1>
              {/* <span className="text-sm">{productPlainObject.price}$</span> */}
              <div className="text-sm">
                {productPlainObject.onSale ? (
                  <>
                    <span className="line-through">
                      {productPlainObject.oldPrice} $
                    </span>{" "}
                    <span>{productPlainObject.price} $</span>
                  </>
                ) : (
                  <>
                    {productPlainObject.quantity
                      ? (
                        productPlainObject.price * productPlainObject.quantity
                      ).toFixed(2)
                      : productPlainObject.price}{" "}
                    $
                  </>
                )}
              </div>
              <p className="text-sm">{productPlainObject.description}</p>
            </div>
            <div className="w-full p-5 flex flex-col gap-3">
              {
                !!productPlainObject?.height && (
                  <div className="space-y-2 flex-1 w-full md:flex-none md:w-auto">
                    <Label htmlFor="height">Height in Feet</Label>
                    <Select value={height} onValueChange={value => formDataHandler('height',value)}>
                      <SelectTrigger id="height">
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          productPlainObject.height.map((val, _index) => (
                            <SelectItem key={_index} value={val}>{val} feet</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                )
              }


              {!!productPlainObject?.weight && (
                <div className="space-y-2 flex-1 w-full md:flex-none md:w-auto">
                  <Label htmlFor="weight">Weight in Kilograms</Label>
                  <Select value={weight} onValueChange={value => formDataHandler('weight',value)}>
                    <SelectTrigger id="weight">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>

                    <SelectContent>
                      {
                        productPlainObject.weight.map((val, _index) => (
                          <SelectItem key={_index} value={val}>{val} Kg</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* wood type */}
              {
                !!productPlainObject?.woodType && (
                  <div className="space-y-2 flex-1 w-full md:flex-none md:w-auto  ">
                    <Label htmlFor="sort-by">Wood Type</Label>
                    <Select value={woodType} onValueChange={value => formDataHandler('woodType',value)}>
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Select Wood Type" />
                      </SelectTrigger>

                      <SelectContent>
                        {
                          productPlainObject.woodType.map((val, _index) => (
                            <SelectItem key={_index} value={val}>{val}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                )
              }


            </div>
            {/* <Button onClick={() => OrderProduct(productPlainObject)} className="w-full text-sm p-2.5 h-full transition-all hover:bg-color-secondary">
              Place Order{" "}
            </Button> */}
            <OrderPopup formData={formData} className="w-full text-sm p-2.5 h-full transition-all hover:bg-color-secondary" />
            {/* <AddToCart
            session={session}
            product={productPlainObject}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          /> */}
          </div>

          <Accordion type="single" collapsible className="w-full">
            {/* Composition */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                COMPOSITION
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Our Gada and Dandpaat are crafted using high-quality materials
                  sourced from trusted suppliers across India. The handles are
                  made from premium quality <strong>hardwood</strong> such as{" "}
                  <strong>rosewood</strong> or{" "}
                  <strong>teak</strong> , known for their durability and
                  strength. The heads are forged from <strong>brass</strong> or{" "}
                  <strong>steel</strong> , ensuring longevity and performance in
                  martial arts training or ceremonial use.
                </p>
                <p>
                  Each weapon is hand-crafted by skilled artisans who have
                  inherited the craft passed down through generations. The
                  traditional methods ensure that every product is unique, with
                  attention to detail in its form and finish.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Care */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm">CARE</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>
                  Taking care of your Gada or Dandpaat ensures its longevity and
                  preserves the craftsmanship.
                </p>
                <p>
                  <strong>Wood Care:</strong> Regularly wipe down the wooden handle with a soft, dry cloth
                  to remove dust and moisture. If the wood starts to dry out,
                  apply a small amount of <strong>wood oil</strong> to keep it
                  smooth and prevent cracking.
                </p>
                <p>
                  <strong>Metal Care:</strong> For the metal parts, clean them
                  with a dry cloth to remove fingerprints and dust. You can use{" "}
                  <strong>brass polish</strong> or a{" "}
                  <strong>steel cleaner</strong> for a more thorough clean,
                  restoring the shine and protecting the metal from corrosion.
                </p>
                <p>
                  <strong>Storage:</strong> Keep your Gada or Dandpaat in a dry
                  and cool environment, away from direct sunlight and moisture.
                  Hanging them on a wall or storing them in a protective case is
                  ideal for preventing damage.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Origin */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm">ORIGIN</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>
                  Our Gada and Dandpaat are hand-crafted by expert artisans in{" "}
                  <strong>India</strong>, a country with a rich history of
                  traditional weaponry and martial arts. The designs are
                  inspired by ancient Indian warriors who wielded these weapons
                  in battle and as a symbol of strength and discipline.
                </p>
                <p>
                  These weapons are not just functional; they are a part of
                  India’s cultural heritage, deeply rooted in
                  {" "}<strong>Hindu mythology</strong> and ancient martial arts
                  practices like
                  {" "}<strong>Kalaripayattu</strong> and
                  {" "}<strong>Malla-Yuddha</strong>. By purchasing these products,
                  you are supporting a craft that has been passed down through
                  generations, and contributing to the preservation of
                  traditional Indian arts.
                </p>
                <p>Made in India</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

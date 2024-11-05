"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductDocument, VariantsDocument } from "@/types/types.old";
import { useEffect, useState } from "react";

import AddToCart from "../cart/AddToCart";
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
  useEffect(() => {
    setSelectedVariant(productPlainObject);
  }, []);

  if (!product) {
    return <div>Produnct not found</div>;
  }

  return (
    <div className="flex flex-wrap justify-between gap-8">
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
            <span className="text-sm">{productPlainObject.price}$</span>
            <p className="text-sm">{productPlainObject.description}</p>
          </div>

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
            <AccordionTrigger className="text-sm">COMPOSITION</AccordionTrigger>
            <AccordionContent>
              <p>
                Our Gada and Dandpaat are crafted using high-quality materials
                sourced from trusted suppliers across India. The handles are
                made from premium quality **hardwood** such as **rosewood** or
                **teak**, known for their durability and strength. The heads are
                forged from **brass** or **steel**, ensuring longevity and
                performance in martial arts training or ceremonial use.
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
                **Wood Care**: Regularly wipe down the wooden handle with a
                soft, dry cloth to remove dust and moisture. If the wood starts
                to dry out, apply a small amount of **wood oil** to keep it
                smooth and prevent cracking.
              </p>
              <p>
                **Metal Care**: For the metal parts, clean them with a dry cloth
                to remove fingerprints and dust. You can use **brass polish** or
                a **steel cleaner** for a more thorough clean, restoring the
                shine and protecting the metal from corrosion.
              </p>
              <p>
                **Storage**: Keep your Gada or Dandpaat in a dry and cool
                environment, away from direct sunlight and moisture. Hanging
                them on a wall or storing them in a protective case is ideal for
                preventing damage.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Origin */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">ORIGIN</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                Our Gada and Dandpaat are hand-crafted by expert artisans in
                **India**, a country with a rich history of traditional weaponry
                and martial arts. The designs are inspired by ancient Indian
                warriors who wielded these weapons in battle and as a symbol of
                strength and discipline.
              </p>
              <p>
                These weapons are not just functional; they are a part of
                India’s cultural heritage, deeply rooted in **Hindu mythology**
                and ancient martial arts practices like **Kalaripayattu** and
                **Malla-Yuddha**. By purchasing these products, you are
                supporting a craft that has been passed down through
                generations, and contributing to the preservation of traditional
                Indian arts.
              </p>
              <p>Made in India</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

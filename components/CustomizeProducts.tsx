/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { products } from '@wix/stores';
import { useEffect, useState } from 'react';
import Add from './Add';

export default function CustomizeProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };
  return (
    <div className='flex flex-col gap-6'>
      {productOptions.map((option) => (
        <div
          className='flex flex-col gap-4'
          key={option.name}
        >
          <h4 className='font-medium'>Choose a {option.name}</h4>
          <ul className='flex items-center gap-3'>
            {option.choices?.map((choice: any) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === 'Color' ? (
                <li
                  className='relative h-8 w-8 rounded-full ring-1 ring-gray-300'
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full ring-2' />
                  )}
                  {disabled && (
                    <div className='absolute left-1/2 top-1/2 h-[2px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-red-400' />
                  )}
                </li>
              ) : (
                <li
                  className='ring-lama text-lama rounded-md px-4 py-1 text-sm ring-1'
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: selected
                      ? '#f35c7a'
                      : disabled
                        ? '#FBCFE8'
                        : 'white',
                    color: selected || disabled ? 'white' : '#f35c7a',
                    boxShadow: disabled ? 'none' : '',
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || '00000000-0000-0000-0000-000000000000'
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
}

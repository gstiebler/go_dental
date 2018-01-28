import { idByValue } from './init';
import { Product } from '../../server/db/schemas/Product';
import { Dental } from '../../server/db/schemas/Dental';

export default async () => {
  return [
    {
      product: await idByValue(Product, 'name', 'Escova de dente'),
      dental: await idByValue(Dental, 'name', 'Dental 1'),
      qty: 13,
      price: 10.0,
    },
    {
      product: await idByValue(Product, 'name', 'Escova de dente'),
      dental: await idByValue(Dental, 'name', 'Dental 2'),
      qty: 15,
      price: 11.0,
    },
    {
      product: await idByValue(Product, 'name', 'Escova de dente'),
      dental: await idByValue(Dental, 'name', 'Dental 3'),
      qty: 17,
      price: 8.0,
    },
    {
      product: await idByValue(Product, 'name', 'Massa de dente'),
      dental: await idByValue(Dental, 'name', 'Dental 1'),
      qty: 19,
      price: 110.0,
    },
    {
      product: await idByValue(Product, 'name', 'Massa de dente'),
      dental: await idByValue(Dental, 'name', 'Dental 3'),
      qty: 18,
      price: 150.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca pequena'),
      dental: await idByValue(Dental, 'name', 'Dental 1'),
      qty: 13,
      price: 500.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca pequena'),
      dental: await idByValue(Dental, 'name', 'Dental 2'),
      qty: 15,
      price: 1000.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca pequena'),
      dental: await idByValue(Dental, 'name', 'Dental 3'),
      qty: 17,
      price: 2000.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca média'),
      dental: await idByValue(Dental, 'name', 'Dental 3'),
      qty: 20,
      price: 4900.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca grande'),
      dental: await idByValue(Dental, 'name', 'Dental 1'),
      qty: 17,
      price: 2803.0,
    },
    {
      product: await idByValue(Product, 'name', 'Broca grande'),
      dental: await idByValue(Dental, 'name', 'Dental 3'),
      qty: 42,
      price: 3294.0,
    },
  ];
}
import { Button, TextInput } from '@mantine/core';
import { useFormik, Field, Form, Formik, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

type FormState = {
  currentStockPrice: number;
  initialInvestmentAmount: number;
  targetInvestmentAmount: number;
  percentageIncrease: number;
};
// use either the percentage increase or target investment amount to calculate the target stock price

const StockForm = () => {
  const [targetStockPrice, setTargetStockPrice] = useState<number>();

  const calculateTargetStockPrice = (values: FormState): number => {
    let target = 0;
    if (values.percentageIncrease) {
      target =
        values.currentStockPrice +
        (values.currentStockPrice * values.percentageIncrease) / 100;
    } else {
      target =
        (values.targetInvestmentAmount / values.initialInvestmentAmount) *
        values.currentStockPrice;
    }
    return target;
  };

  return (
    <Formik
      initialValues={{
        currentStockPrice: 0,
        initialInvestmentAmount: 0,
        targetInvestmentAmount: 0,
        percentageIncrease: 0,
      }}
      validationSchema={Yup.object({
        currentStockPrice: Yup.number().required(),
        initialInvestmentAmount: Yup.number().required(),
        // targetInvestmentAmount: Yup.number().when(['percentageIncrease'], {
        //   is: (percentageIncrease: number) => percentageIncrease === 0,
        //   then: Yup.number().required(),
        // }),
        // percentageIncrease: Yup.number().when(['targetInvestmentAmount'], {
        //   is: (targetInvestmentAmount: number) => targetInvestmentAmount === 0,
        //   then: Yup.number().required(),
        // }),
      })}
      onSubmit={(values) => {
        console.log({ values });

        const targetStockPrice = calculateTargetStockPrice(values);
        setTargetStockPrice(targetStockPrice);
      }}
    >
      <Form className="min-w-[300px] rounded-md border-gray-200 bg-white p-4 shadow-xl">
        <div className="space-y-6">
          <Field
            as={TextInput}
            type="number"
            name="currentStockPrice"
            label="Current Stock Price"
          />
          <ErrorMessage name="currentStockPrice" />
          <Field
            as={TextInput}
            type="number"
            name="initialInvestmentAmount"
            label="Initial Investment Amount"
          />
          <ErrorMessage name="initialInvestmentAmount" />

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex w-full flex-col">
              <Field
                as={TextInput}
                type="number"
                name="targetInvestmentAmount"
                label="Target Investment Amount"
              />
              <ErrorMessage name="targetInvestmentAmount" />
            </div>
            <div className="flex w-full flex-col">
              <Field
                as={TextInput}
                type="number"
                name="percentageIncrease"
                label="Desired Percentage Increase"
              />
              <ErrorMessage name="percentageIncrease" />
            </div>
          </div>

          {targetStockPrice && (
            <p>You'll need to sell this stock at {targetStockPrice}</p>
          )}

          <Button className=" bg-blue-400" type="submit">
            Calculate
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default StockForm;

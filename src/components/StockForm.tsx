import { Button, NumberInput } from '@mantine/core';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import {
  currencyFormatter,
  numberInputdFormatter,
  numberInputParser,
  numberInputPercentageFormatter,
  numberInputpercentageParser,
} from '../utils';
import { REQUIRED_FIELD } from '../constants';

type FormState = {
  stockPrice: number;
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
        values.stockPrice +
        (values.stockPrice * values.percentageIncrease) / 100;
    } else {
      target =
        (values.targetInvestmentAmount / values.initialInvestmentAmount) *
        values.stockPrice;
    }
    return target;
  };

  const { errors, touched, ...formik } = useFormik<Partial<FormState>>({
    initialValues: {
      stockPrice: undefined,
      initialInvestmentAmount: undefined,
      targetInvestmentAmount: undefined,
      percentageIncrease: undefined,
    },
    validationSchema: Yup.object({
      stockPrice: Yup.number().required(REQUIRED_FIELD),
      initialInvestmentAmount: Yup.number().required(REQUIRED_FIELD),
    }),
    onSubmit: (values) => {
      const targetStockPrice = calculateTargetStockPrice(values as FormState);
      setTargetStockPrice(targetStockPrice);
    },
  });

  const parser = useCallback(numberInputParser, []);
  const formatter = useCallback(numberInputdFormatter, []);
  const percentageFormatter = useCallback(numberInputPercentageFormatter, []);
  const percentageParser = useCallback(numberInputpercentageParser, []);

  let { percentageIncrease, targetInvestmentAmount } = formik.values;
  const usesPercentageIncrease = percentageIncrease !== undefined;

  function handleClear() {
    setTargetStockPrice(undefined);
    formik.resetForm();
  }

  return (
    <form
      className="mx-4 rounded-md border-gray-200 bg-white p-8 shadow-xl sm:w-[500px]"
      onSubmit={formik.handleSubmit}
    >
      <header className="mb-4">
        <h2 className="text-xl font-semibold uppercase">Check the stock</h2>
        <small className="text-gray-600">
          Figure out your exit price based on your goals!
        </small>
      </header>
      <div className="space-y-6">
        <NumberInput
          label="Stock Price"
          withAsterisk
          hideControls
          parser={parser}
          formatter={formatter}
          precision={2}
          {...formik.getFieldProps('stockPrice')}
          onChange={(value) => (formik.values.stockPrice = value)}
          error={errors.stockPrice && touched.stockPrice && errors.stockPrice}
        />

        <NumberInput
          label="Initial Investment Amount"
          {...formik.getFieldProps('initialInvestmentAmount')}
          parser={parser}
          formatter={formatter}
          withAsterisk
          hideControls
          onChange={(value) => (formik.values.initialInvestmentAmount = value)}
          error={
            errors.initialInvestmentAmount &&
            touched.initialInvestmentAmount &&
            errors.initialInvestmentAmount
          }
        />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex w-full flex-col">
            <NumberInput
              label="Target Investment Amount"
              {...formik.getFieldProps('targetInvestmentAmount')}
              parser={parser}
              formatter={formatter}
              hideControls
              onChange={(value) =>
                (formik.values.targetInvestmentAmount = value)
              }
              error={
                errors.targetInvestmentAmount &&
                errors.targetInvestmentAmount &&
                errors.targetInvestmentAmount
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <NumberInput
              label="Desired Percentage Increase"
              {...formik.getFieldProps('percentageIncrease')}
              parser={percentageParser}
              formatter={percentageFormatter}
              hideControls
              onChange={(value) => (formik.values.percentageIncrease = value)}
              error={
                errors.percentageIncrease &&
                touched.percentageIncrease &&
                errors.percentageIncrease
              }
            />
          </div>
        </div>

        {targetStockPrice && (
          <p>
            You'll need to sell this stock at{' '}
            <span className="text-lg font-bold text-primary">
              {currencyFormatter(targetStockPrice)}
            </span>{' '}
            {usesPercentageIncrease
              ? `to get an increase of ${percentageIncrease} on your investment`
              : `to grow your investment to ${currencyFormatter(
                  targetInvestmentAmount
                )}`}
          </p>
        )}

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleClear}
            size="lg"
            color="gray"
            variant="subtle"
            className="w-full"
            type="submit"
          >
            Clear
          </Button>
          <Button size="lg" className="w-full bg-primary" type="submit">
            Calculate
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StockForm;

import { FormData } from "./types";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  fundraiserTitle: yup.string().required('Fundraiser Title Required'),
  fundraiserDescription: yup
    .string()
    .min(200, 'The description must be at least 200 characters')
    .max(500, 'The description must be at most 500 characters')
    .required('A fundraiser description is required'),
  goal: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Goal is required'),
  category: yup
    .string()
    .oneOf(['Medical', 'Education', 'Business', 'Others'], 'Please select a valid category')
    .required('Category is required'),
  deadline: yup
    .date()
    .transform(value => (value === '' ? null : value))
    .required('Deadline date is required')
});
interface FundingGoalProps {
  defaultValues?: FormData['fundingGoal'];
  onNext: (data: FormData['fundingGoal']) => void;
  onPrevious: () => void;
}

export default function FundingGoal({ defaultValues, onNext, onPrevious }: FundingGoalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData['fundingGoal']>({
    resolver: yupResolver(schema),
    defaultValues
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onNext(data);
  });

  return (
    <div className="pt-5">
      <p className='text-3xl font-bold pb-3'>How much money are you looking to raise?</p>

      <form onSubmit={onSubmit}>
        <div className="flex gap-2 flex-col">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fundraiser Title</label>
            <input {...register('fundraiserTitle')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fundraiser Title" />
            {errors.fundraiserTitle && <p className="text-red-600 text-sm">{errors.fundraiserTitle.message}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fundraiser Description or Story</label>
            <textarea {...register('fundraiserDescription')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Provide a detailed description of your fundraiser." />
            {errors.fundraiserDescription && <p className="text-red-600 text-sm">{errors.fundraiserDescription.message}</p>}
            <p className="text-gray-500 text-sm mt-1">Provide a detailed description of your fundraiser.</p>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fundraising Goal</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                <input type="text" {...register('goal')} className="pl-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" />
              </div>
              {errors.goal && <p className="text-red-600 text-sm">{errors.goal.message}</p>}
              <p className="text-gray-500 text-sm mt-1">How much money do you aim to raise?</p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campaign Category</label>
              <select {...register('category')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Choose a campaign</option>
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
            </div>
          </div>

          <div className="mb-6 flex-col justify-center flex">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline For Your Fundraiser</label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
              <input type="date" {...register('deadline')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div>
            {errors.deadline && <p className="text-red-600 text-sm">{errors.deadline.message}</p>}
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onPrevious} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Previous</button>
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
          </div>
        </div>
      </form>
    </div>
  );
}
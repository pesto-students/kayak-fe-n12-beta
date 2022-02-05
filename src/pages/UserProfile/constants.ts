import * as yup from 'yup';

export const userDetailsSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required!'),
  lastname: yup.string().required('Last Name is required!'),
  email: yup.string().required('Email is required'),
  contactNumber: yup.number().required('Contact No is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.number().required('Zip Code is required'),
  country: yup.string().required('Country is required'),
  company: yup.string().required('Company Name is required'),
  companyType: yup.string().required('Company Name is required'),
  pan: yup.string().required('PAN is required')
});

export const COMPANY_TYPE = [
  { label: 'Limited', value: 'ltd', id: '1' },
  { label: 'Private Limited', value: 'ptld', id: '2' },
  { label: 'Proprietor', value: 'prop', id: '3' },
  { label: 'Partnership', value: 'part', id: '4' }
];

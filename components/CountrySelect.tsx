'use client'

import useCountries from '@/hooks/useCountries';
import Select from 'react-select';

export type CountrySelectValue={
    value:string;
    region:string;
    flag:string;
    label:string;
    latlng:number[];
}

interface CountrySelectProps{
    value?:CountrySelectValue;
    onChange:(value:CountrySelectValue)=>void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({value, onChange}) => {
    const {getCountries}=useCountries();
    return (  
        <div>
            <Select classNames={{control:()=>"p-3 border-2", input:()=>"text-lg", option:()=>"text-lg"}} 
            theme={(theme)=>({
                ...theme,
                borderRadius:6,
                color:{
                    ...theme.colors,
                    primary:'black',
                    primary25:'#ffe4e6'
                }
            })}
            placeholder="Anywhere" value={value} formatOptionLabel={(option:any)=>(
                <div className='flex flex-row items-center gap-3'>
                    <div>{option.flag}</div>
                    <div>{option.label},<span className='text-neutral-500 ml-1'>{option.region}</span></div>
                </div>
            )} onChange={(value:any)=>onChange(value as CountrySelectValue)} isClearable options={getCountries()}></Select>
        </div>
    );
}
 
export default CountrySelect;
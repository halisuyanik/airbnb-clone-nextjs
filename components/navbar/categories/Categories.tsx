'use client'
import Container from "@/components/container/Container";
import { categories } from "@/mocks/categories";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "@/components/CategoryBox";




const Categories = () => {
    const params=useSearchParams();
    const selectedCategory=params?.get('category');
    const pathname=usePathname();
    const isMainPage=pathname==='/';
    if(!isMainPage){
        return null;
    }
    return ( 
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((category)=>(
                    <CategoryBox key={category.label} selected={selectedCategory===category.label} label={category.label} description={category.description} icon={category.icon}/>
                ))}
            </div>
        </Container>
     );
}
 
export default Categories;
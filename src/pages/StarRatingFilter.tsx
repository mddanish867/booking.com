import { starRating } from "../config/hotel-options-config";

type Props = {
    selectedStars: string[];
    onChange: (even:React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({selectedStars,onChange}:Props) =>{
    return(
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2"> Property Rating</h4>
            {starRating.map((star,index) =>(
                <label className="flex items-center space-x-2" key={index}>
                    <input type="checkbox" className="rounded" value={star} checked={selectedStars.includes(star)}
                    onChange={onChange}/>
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    )
}
export default StarRatingFilter;
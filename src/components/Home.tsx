import StarIcon from "@mui/icons-material/Star";
import { SupplierType } from "../App";
import { TagsGroup } from "./TagsGroup";
interface IHomeProps {
  supplier?: SupplierType;
}

const Home = ({ supplier }: IHomeProps) => {
  if (supplier === undefined)
    return (
      <div className="flex w-full justify-center m-4">
        Supplier data wasn't loaded. Smash that "Load" button above!
      </div>
    );

  const suplierTagGroups = Object.keys(supplier)
    .filter((key) => key.includes("tag"))
    .map((key) => {
      const groupName = key.replace("tags-", "");
      const tagsInGroup = supplier[key as keyof Omit<SupplierType, "name">];
      return <TagsGroup name={groupName} tags={tagsInGroup} key={key} />;
    });

  return (
    <>
      <div className="inline-block border-solid border-0 border-b border-b-slate-400 my-5">
        <p className="flex items-center py-2 text-3xl m-0">
          <StarIcon color="primary" classes={{ root: "text-sm" }} />
          {supplier.name}
        </p>
      </div>
      <section>{suplierTagGroups}</section>
    </>
  );
};

export default Home;

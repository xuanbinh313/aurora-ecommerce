import { Media } from "@/app/lib/definitions";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export interface ImageCardCheckboxProps {
  data: Media[];
  value: Media[];
  onChange: (value: Media[]) => void;
}

export const ImageCardCheckbox: React.FC<ImageCardCheckboxProps> = ({
  data,
  value,
  onChange,
}) => {
  return (
    <>
      {data && data.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {data.map((url, index) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${url.src}${url.name}_medium.${url.media_type.split("/")[1]}`;
            const isSelected = value.some((item) => item.id === url.id);
            return (
              <div key={url.id}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(val) => {
                    if (!!val) {
                      onChange([...value, url]);
                    } else {
                      onChange(value.filter((item) => item.id !== url.id));
                    }
                  }}
                  id={url.name}
                />
                <label
                  htmlFor={url.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-full rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/next.svg";
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export interface ImageCardRadioProps {
  data: Media[];
  value?: Media | null;
  onChange: (value: Media | null) => void;
}

export const ImageCardRadio: React.FC<ImageCardRadioProps> = ({
  data,
  value,
  onChange,
}) => {
  return (
    <>
      <RadioGroup
        onValueChange={(val) => {
          const selectedMedia = data.find((item) => item.id.toString() === val);
          onChange(selectedMedia || null);
        }}
        value={value ? value.id.toString() : null}
      >
        <div className="grid grid-cols-3 gap-4">
          {data.map((url, index) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${url.src}${url.name}_medium.${url.media_type.split("/")[1]}`;
            return (
              <div key={url.id}>
                <RadioGroupItem value={url.id.toString()} id={url.name} />
                <Label
                  htmlFor={url.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-full rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/next.svg";
                    }}
                  />
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </>
  );
};

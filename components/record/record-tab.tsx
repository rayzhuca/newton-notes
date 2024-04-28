import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import RecordSide from "./record-side";

let content: string;

const RecordTab: React.FC = () => {
    return (
        <div className="flex">
            <RecordSide />
            <div className="h-full grow-[2] py-4 px-32 flex flex-col gap-4 relative">
                <div className="grow-[3] rounded-md bg-background relative flex flex-col overflow-auto">
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" className="p-2 h-6 bg-background my-2 ml-4 rounded-md">
                            Output
                        </Button>
                        <Button variant="ghost" className="p-0 w-6 h-6 mr-4">
                            <Clipboard className="size-3" />
                        </Button>
                    </div>
                    <div className="w-full *:w-full px-6 pt-2 last:mb-4 h-full">
                        <h3 className="text-2xl font-semibold tracking-tight pb-3">Notes on Earth</h3>
                        <p className="text-sm leading-6 font-normal">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

content = `Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by
Earth being a water world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's
water is contained in its global ocean, covering 70.8% of Earth's crust. The remaining 29.2% of Earth's crust is
land, most of which is located in the form of continental landmasses within Earth's land hemisphere. Most of Earth's
land is somewhat humid and covered by vegetation, while large sheets of ice at Earth's polar deserts retain more
water than Earth's groundwater, lakes, rivers and atmospheric water combined. Earth's crust consists of slowly
moving tectonic plates, which interact to produce mountain ranges, volcanoes, and earthquakes. Earth has a liquid
outer core that generates a magnetosphere capable of deflecting most of the destructive solar winds and cosmic
radiation. Earth has a dynamic atmosphere, which sustains Earth's surface conditions and protects it from most
meteoroids and UV-light at entry. It has a composition of primarily nitrogen and oxygen. Water vapor is widely
present in the atmosphere, forming clouds that cover most of the planet. The water vapor acts as a greenhouse gas
and, together with other greenhouse gases in the atmosphere, particularly carbon dioxide (CO2), creates the
conditions for both liquid surface water and water vapor to persist via the capturing of energy from the Sun's
light. This process maintains the current average surface temperature of 14.76 °C (58.57 °F), at which water is
liquid under atmospheric pressure. Differences in the amount of captured energy between geographic regions (as with
the equatorial region receiving more sunlight than the polar regions) drive atmospheric and ocean currents,
producing a global climate system with different climate regions, and a range of weather phenomena such as
precipitation, allowing components such as nitrogen to cycle. Earth is rounded into an ellipsoid with a
circumference of about 40,000 km. It is the densest planet in the Solar System. Of the four rocky planets, it is the
largest and most massive. Earth is about eight light-minutes away from the Sun and orbits it, taking a year (about
365.25 days) to complete one revolution. Earth rotates around its own axis in slightly less than a day (in about 23
hours and 56 minutes). Earth's axis of rotation is tilted with respect to the perpendicular to its orbital plane
around the Sun, producing seasons. Earth is orbited by one permanent natural satellite, the Moon, which orbits Earth
at 384,400 km (1.28 light seconds) and is roughly a quarter as wide as Earth. The Moon's gravity helps stabilize
Earth's axis, causes tides and gradually slows Earth's rotation. Tidal locking has made the Moon always face Earth
with the same side. Earth, like most other bodies in the Solar System, formed 4.5 billion years ago from gas in the
early Solar System. During the first billion years of Earth's history, the ocean formed and then life developed
within it. Life spread globally and has been altering Earth's atmosphere and surface, leading to the Great Oxidation
Event two billion years ago. Humans emerged 300,000 years ago in Africa and have spread across every continent on
Earth. Humans depend on Earth's biosphere and natural resources for their survival, but have increasingly impacted
the planet's environment. Humanity's current impact on Earth's climate and biosphere is unsustainable, threatening
the livelihood of humans and many other forms of life, and causing widespread extinctions.`;

export default RecordTab;

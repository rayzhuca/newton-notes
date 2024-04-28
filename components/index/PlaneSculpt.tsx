import Spline from "@splinetool/react-spline";

const PlaneSculpt = () => {
    const onLoad = (spline: any) => {
        spline.setZoom(3);
    };

    return (
        <div className="absolute right-12 top-[18%] w-1/2 h-2/3">
            <Spline scene="https://prod.spline.design/WGTmqmpNL4ulWQom/scene.splinecode" onLoad={onLoad} />
        </div>
    );
};

export default PlaneSculpt;

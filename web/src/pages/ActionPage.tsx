import { Button } from "@/components/ui/button";

export function ActionPage() {
  const buttonBase =
    "h-52 text-4xl font-semibold text-white rounded-lg transition-all duration-200";

  const gradientHover =
    "hover:bg-gradient-to-br hover:from-blue-900 hover:via-violet-700 hover:to-blue-500 " +
    "active:bg-gradient-to-br active:from-blue-900 active:via-violet-700 active:to-blue-500 " +
    "hover:scale-105 active:scale-95";

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-16">Quick Actions</h1>

      <div className="grid grid-cols-2 gap-6">
        <Button
          className={`${buttonBase} bg-black ${gradientHover}`}
          onClick={() =>
            handleRedirect(
              "https://afwestavenueph.anytimefitness.app/widget/form/biYV1IXgB3sIIlooezpg?notrack=true"
            )
          }
        >
          NEW JOINED MEMBER
        </Button>

        <Button className={`${buttonBase} bg-black ${gradientHover}`}>
          NEW PERSONAL TRAINING SALES
        </Button>
        <Button className={`${buttonBase} bg-black ${gradientHover}`}>
          NEW LEADS (MANUAL ADD)
        </Button>
        <Button className={`${buttonBase} bg-black ${gradientHover}`}>
          OVERRIDE CONDUCTION REQUEST
        </Button>
      </div>
    </div>
  );
}

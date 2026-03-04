'use client';
export default function MessageSplitter({ date }: { date: Date }) {
    const timeZone = 'America/Sao_Paulo';

    function normalizeToMidnight(d: Date) {
        const normalized = new Date(
            d.toLocaleString('br-pt', { timeZone })
        );
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    }

    const messageDate = normalizeToMidnight(date);
    const today = normalizeToMidnight(new Date());

    const diffInMs = today.getTime() - messageDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    function getLabel() {
        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';

        if (diffInDays > 1 && diffInDays <= 7) {
            return date.toLocaleDateString('br-pt', {
                weekday: 'long',
                timeZone
            });
        }

        return date.toLocaleDateString('br-pt', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            timeZone
        });
    }

    return (
        <div className="flex justify-center items-center w-[100vw] h-[1px] py-[15px] border-t-[1px] border-gray-500">
            <p className="text-center text-gray-500 text-[14px]">
                {getLabel()}
            </p>
        </div>
    );
}
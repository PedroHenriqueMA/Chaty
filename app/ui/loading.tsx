export default function LoadingSpinner() {
    return (
        <div style={{
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'

        }}>
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    border: '5px solid #e0e0e0',
                    borderTopColor: 'rgb(126, 33, 70)',
                    borderRadius: '50%',
                    animation: 'spin 0.9s linear infinite'
                }}
            />
        </div>
    )
}
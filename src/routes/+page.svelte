<script>
    async function speedTest() {
        const res = await fetch("/api/speed-test", 
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: "hello"})
        }
        )
        const data = await res.json()
        console.log(data)
    }
</script>
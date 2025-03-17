import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const lecturers = ["Dr. Ali", "Dr. Fatimah", "Prof. Rahman", "Dr. Aisyah", "Dr. Khalid"]; // Gantikan dengan 70 nama sebenar
const classrooms = ["Kelas A", "Kelas B", "Kelas C", "Kelas D", "Kelas E", "Kelas F", "Kelas G", "Kelas H", "Kelas I", "Kelas J"];
const timeslots = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "14:00 - 15:00", "15:00 - 16:00"];

export default function BookingSystem() {
  const [lecturer, setLecturer] = useState("");
  const [classroom, setClassroom] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/username/repo/main/reservations.json")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const handleSubmit = () => {
    if (!lecturer || !classroom || !time) return alert("Sila lengkapkan semua maklumat.");

    const newBooking = { lecturer, classroom, time };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    fetch("https://api.github.com/repos/username/repo/contents/reservations.json", {
      method: "PUT",
      headers: {
        "Authorization": "token YOUR_GITHUB_TOKEN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update reservations",
        content: btoa(JSON.stringify(updatedBookings, null, 2)),
        sha: "SHA_OF_PREVIOUS_FILE"
      })
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sistem Tempahan Kelas</h1>
      <Card>
        <CardContent className="p-4">
          <Select onValueChange={setLecturer}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Pilih Pensyarah" /></SelectTrigger>
            <SelectContent>{lecturers.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent>
          </Select>

          <Select onValueChange={setClassroom}>
            <SelectTrigger className="w-full mt-2"><SelectValue placeholder="Pilih Kelas" /></SelectTrigger>
            <SelectContent>{classrooms.map((room) => <SelectItem key={room} value={room}>{room}</SelectItem>)}</SelectContent>
          </Select>

          <Select onValueChange={setTime}>
            <SelectTrigger className="w-full mt-2"><SelectValue placeholder="Pilih Masa" /></SelectTrigger>
            <SelectContent>{timeslots.map((slot) => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}</SelectContent>
          </Select>

          <Button onClick={handleSubmit} className="w-full mt-4">Tempah Kelas</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-6">Senarai Tempahan</h2>
      <ul className="mt-2">
        {bookings.map((b, index) => (
          <li key={index} className="border p-2 rounded mt-2">{b.lecturer} tempah {b.classroom} pada {b.time}</li>
        ))}
      </ul>
    </div>
  );
}
